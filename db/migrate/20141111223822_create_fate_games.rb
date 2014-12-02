class CreateFateGames < ActiveRecord::Migration
  def change
    create_table :fate_games do |t|
      # Game Name
      t.string :name
      # Setting Name
      t.string :setting_name
      # Array of character primary keys
      t.string :character_ids
      # Array of player primary keys
      t.string :player_ids
      # Array of GM user ids
      t.string :gms
      # Boolean; whether or not the game requires GM approval to add yourself to
      t.boolean :requires_approval
      # Array of skill names
      t.string :skill_list
      # Hash of hashes; stress tracks, default sizes, and related skills
      # Ex, might contain {"Physical" => {"Size" => 2, "Skill" => "Physique"},
      #                    "Mental" => {"Size" => 2, "Skill" => "Will"}
      t.string :stress_tracks
      # Hash of names of default consequences and an array of sizes
      # Ex. a Dresden game would have {"Physical" => [-2, -4, -6, -8], "Mental" => [-2, -4, -6, -8], 
      # "Social" => [-2, -4, -6, -8]}, but a default Fate game would just have {"Shared" => [-2, -4, -6]}
      t.string :consequences
      # Array of the names of Aspects PC will have - ex. wobbly would have ["Sphere, General, General, General, General"],
      # standard Fate would have ["High Concept", "Trouble", "Phase One", "Phase Two", "Phase Three"], etc
      t.string :aspects
      # Int of the total refresh for PCs in the game
      t.integer :total_refresh
      # Int of the minimum number of stunts for PCs in the game
      t.integer :stunts
      #Int of the maximum number of stunts for PCs in the game
      t.integer :max_stunts
      # Int of the base PC number of skill points
      t.integer :skill_points
      # String of the skill arrangement requirement. Can be Pyramid, Column, or Free
      t.string :skill_arrangement
    end
  end
end
