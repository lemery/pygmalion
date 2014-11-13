class CreateFateGames < ActiveRecord::Migration
  def change
    create_table :fate_games do |t|
      t.string :name
      # Array of character primary keys
      t.integer :character_ids
      # Array of player primary keys
      t.integer :player_ids
      # Array of GM names
      t.string :gms
      # Boolean; whether or not the game requires GM approval to add yourself to
      t.boolean :requires_approval
      # Array of skill names
      t.string :skill_list
      # Hash names of stress tracks and default sizes
      # Ex, might contain {"Physical" => 2, "Mental" => 2}
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
      end
  end
end
