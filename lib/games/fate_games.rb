require 'sinatra/base'

module Sinatra
  module Games
    module FateGames
      def self.registered(app)
        
        # Route for handling GET requests for the game-making page
        app.get '/make/game/fate' do
          @task = "Make"
          erb :'games/fate_game'
        end
        
        # Route for handling posts to make a Fate game
        app.post '/make/game/fate' do
          if (logged_in?)
            name = make_fate_game(params)
            redirect_url = "/view/games/fate/" + name
            redirect to(redirect_url)
          else 
            erb :'auth/restricted'  
          end
        end
        
        # Route for handling edit post requests
        app.post '/edit/game/fate/:game_name/:attribute' do
          # Passes parameters to edit_fate_game for processing
          edit_details = edit_fate_game(params[:game_name], params[:attribute], params[:new_val])
          # If the game requested exists
          if edit_details[:exists]
            # Check if the user is authorized
            if edit_details[:authorized]
              # If the game has the attribute in question, update it
              if edit_details[:game].has_attribute?(edit_details[:attribute])
                edit_details[:game].update_attribute(edit_details[:attribute], edit_details[:new_val]);
              # Otherwise raise an error
              else
                raise "Error: The Fate game #{params[:game_name]} does not have the attribute #{edit_details[:attribute]}"
              end
            # If the user is not allowed, tell them that
            else
              erb :restricted
            end
          # If the game does not exist, say that
          else
            @name = params[:game_name]
            erb :'games/no_game'
          end
        end
      
        # Route for handling the (TEMPORARY) force-edit command
        app.get '/view/games/fate/:game_name/force-edit' do
          if (FateGame.exists?(:name => "#{params[:gamename]}"))
            @task = "View"
            @game = FateGame.where(name: "#{params[:gamename]}").first()
            @permissions = "Edit"
            # This doesn't appear to do anything, but not deleting it just yet,
            # just in case
            # currViewerID = User.where(:username => session[:username]).first().id
            erb :'games/fate_game'
          else
            @name = "\"#{params[:game_name]}\""
            erb :'games/no_game'
          end
        end
        
        # Route for handling view requests for specific games
        app.get '/view/games/fate/:game_name' do
          if (FateGame.exists?(:name => "#{params[:gamename]}"))
            @task = "View"
            @game = FateGame.where(name: "#{params[:gamename]}").first()
            if (User.exists?(:username => session[:username]))
              curr_viewer_id = User.where(:username => session[:username]).first().id
            else
              curr_viewer_id = nil;
            end
            if (@game.gms.include? curr_viewer_id)
              @permissions = "Edit"
            else
              @permissions = "View"
            end
            erb :'games/fate_game'
          else
            @name = "\"#{params[:gamename]}\""
            erb :'games/no_game'
          end
        end
           
        # Route for handling view all games requests     
        app.get '/view/games' do
          @system_names = ["Fate"]
          @games = []
          @games.push(FateGame.count > 0 ? FateGame.order(:name).limit(10) : false)
          erb :view_games
        end
        
        # Tells the browser what the Fate game presets are
        app.get '/presets/games/fate' do
          content_type :json
          JSON.parse(File.read('fate_presets.json'))
        end
      end
    end
  end
end