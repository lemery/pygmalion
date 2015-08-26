require 'sinatra/base'

module Sinatra
  module FateGameFunctions
    
    def make_fate_game(params)
      game = FateGame.new
      # Game Name
      game.name = "#{params[:game_name]}"
      # Setting Name
      game.setting_name = "#{params[:setting_name]}"
      # Aspects. Gets the number of aspects, generates keys from that, then gets each of the aspect types and puts them in an array
      num_aspects = params[:num_aspects].to_i
      aspects_array = []
      for i in 0...num_aspects
        temp_string = "aspect_type_" + i.to_s
        aspects_array.push(params[temp_string])
      end
      game.aspects = aspects_array
      # Stress Tracks. Gets the number of stress tracks, generates keys from that. For each stress track, converts the size string to an int, then hashes everything
      # to the final form stress_tracks = {track_1_name => {"Size" => {track_1_size}, "Skill" => {track_1_skill},
      #                                                                                         ...
      #                                    track_n_name => {"Size" => {track_n_size}, "Skill" => {track_n_skill}}
      num_stress_tracks = params[:num_stress_tracks].to_i
      stress_tracks_hash = Hash.new
      for i in 0...num_stress_tracks
        tnames = ["stress_track_" + i.to_s + "_name", "stress_track_" + i.to_s + "_size", "stress_track_" + i.to_s + "_skill"]
        temp_hash = {"Size" => params[tnames[1]].to_i, "Skill" => params[tnames[2]].to_s}
        stress_tracks_hash[params[tnames[0]]] = temp_hash
      end
      game.stress_tracks = stress_tracks_hash
      # Consequences. Gets the number of consequence types, generates keys from that. For each consequence type, converts the size string to an array of ints, then hashes everything
      # to the final form consequence_types = {type_1_name => [{type_1_sizes}],
      #                                                        ...
      #                                       track_n_name => [{type_n_sizes}]}
      num_consequences = params[:num_consequence_types].to_i
      consequences_hash = {}
      for i in 0...num_consequences
        tnames = ["consequence_type_" + i.to_s + "_name", "consequence_type_" + i.to_s + "_sizes"]
        size_arr = params[tnames[1]].to_s.split(/[\s,]/)
        for i in 0...size_arr.length
          size_arr[i] = size_arr[i].to_i
        end
        consequences_hash[params[tnames[0]]] = size_arr
      end
      game.consequences = consequences_hash
      # Refresh
      game.total_refresh = params[:pc_refresh].to_i
      # Stunts
      game.stunts = params[:num_stunts].to_i
      game.max_stunts = params[:num_max_stunts].to_i || game.total_refresh
      # Skills
      game.skill_arrangement = params[:skill_arrangement].to_s
      game.skill_points = params[:num_skill_points].to_i
      num_skills = params[:num_skills].to_i
      skills_array = []
      for i in 0...num_skills
        temp_string = "skill_name_" + i.to_s
        skills_array.push(params[temp_string])
      end
      game.skill_list = skills_array
      # GMs
      num_gms = params[:num_gms].to_i
      gms_array = []
      for i in 0...num_gms
        temp_string = "gm_username_" + i.to_s
        if (User.where(username: params[temp_string].to_s).exists?)
          gms_array.push(User.where(username: params[temp_string]).take!.id)
        end
      end
      game.gms = gms_array
      # Players
      num_players = params[:num_players].to_i
      players_array = []
      for i in 0...num_players
        temp_string = "player_username_" + i.to_s
        if (User.where(username: params[temp_string].to_s).exists?)
          players_array.push(User.where(username: params[temp_string]).take!.id)
        end
      end
      game.player_ids = players_array
      # Characters
      game.character_ids = []
      # Requires Permission
      if (params[:requires_approval] == "Yes") 
        game.requires_approval = true
      else
        game.requires_approval = false
      end
      game.save
      return game.name
    end
  end
  
  def edit_fate_game(name, attribute, new_val)
    return_params = {
      :authorized => false, 
      :exists => FateGame.exists?(:name => name),
      :game => nil,
      :attribute => attribute,
      :new_val => new_val 
    }
    if return_params[:exists]
      return_params[:game] = FateGame.where(:name => name).first()
      return_params[:authorized] = authorized?(
        'edit_game', {'game_id' => return_params[:game].id, 'system' => 'fate'}
      )
    end
    return return_params
  end
  
  helpers FateGameFunctions
end