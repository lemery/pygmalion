require 'sinatra/base'

module Sinatra
  module UserFunctions
    def username
      return session[:username]
    end
    
    def logged_in?
      if (session[:logged_in])
        return true
      else
        return false
      end
    end
    
    def restricted
      redirect to('/auth/restricted')
    end
    
    def userid (user)
      return User.find_by(username: user).id
    end
    
    def log_in (user)
      session[:logged_in] = true
      session[:username] = user.username
      session[:admin] = user.globalAdmin
    end
    
    valid_locations = ['admin_cp', 'user_cp', 'view_game', 'edit_game', 'view_char', 'edit_char']
    # Location is the basic name of the type of permission being accessed
    # Valid locations: 
    # admin_cp (Admin Control Panel) 
    # user_cp (User Control Panel) 
    # view_game (View a game) 
    # edit_game (Edit a game)
    # view_char (View a character
    # edit_char (Edit a character)
    
    # Details contains relevant details, depending on location:
    # user_cp: 'user_id' => ID of desired user
    # view_game: 'game_id' => ID of desired game, 'system' => System of desired game ('fate', currently)
    # edit_game: 'game_id' => ID of desired game, 'system' => System of desired game ('fate', currently)
    # view_char: 'char_id' => ID of desired character, 'system' => System of desired char ('fate', currently)
    # edit_char: 'char_id' => ID of desired char, 'system' => System of desired char ('fate', currently)
    def authorized? (location, details)
      # The user is obviously not authorized if they're trying to access a location that doesn't exist
      if (valid_locations.include? location)
        # Admins have global access
        if (session[:admin])
          return true
        else
          case location
          # There is no 'admin_cp' check because logged-in admins received authorization before the case statement began
            
          # Authorization check for viewing a game  
          when (location == 'view_game')
            # Gets us the game in question
            if (details[:system] == 'fate')
              game = FateGame.find(details[:game_id])
            end
              # Everyone is authorized to view public games
            if (game.is_public)
              return true
            # If the game is not public, we have to check if they're allowed. If they aren't logged in, they aren't allowed
            elsif (session[:logged_in])
              # If the logged-in user is found in the list of GMs or Players for the game
              auth_viewers = game.player_ids.concat(game.gms)
              if (auth_viewers.include? userid(session[:username]))
                return true
              end
            end
            
          # Authorization check for editing a game  
          when (location == 'edit_game')
            # No one who isn't logged in can edit a game
            if (session[:logged_in])
              # Gets us the game in question
              if (details[:system] == 'fate')
                game = FateGame.find(details[:game_id])
              end
              # Only GMs and Admins can edit a game
              if (game.gms.include? userid(session[:username]))
                return true
              end
            end
            
          # Authorization check for viewing a character (NOT called for viewing hidden fields like secret_notes
          when (location == 'view_char')
            # Gets us the character and game in question
            if (details[:system] == 'fate')
              char = FateCharacter.find(details[:char_id])
              game = FateGame.find(char.game_id)
            end
            # Everyone can view a publicly-viewable character
            if (char.is_public)
              return true
            # If you're not logged in you can't view a hidden character
            elsif (session[:logged_in])
              # Authorized viewers are game GMs and the owner of the character
              auth_viewers = game.gms << char.player_id
              if (auth_viewers.include? userid(session[:username]))
                return true
              end
            end
          end
        end               
      end
      return false
    end
  end
  
  helpers UserFunctions
end