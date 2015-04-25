class CreateFateCharacters < ActiveRecord::Migration
  def change
      create_table :fate_characters do |t|
        # Player ID
        t.integer :player_id
        # Game ID
        t.integer :game_id
        # Character name
        t.string :charname
        # Url of image
        t.string :charpic
        # Aspects - hash of type {"Type0" => "Name0", "Typen" => "Namen"}
        t.string :aspects
        # Skills - hash of type {"Name" => Value, "Namen" => Valuen}
        t.string :skills
        # Stunts - hash of type {"Name" => "Description", "Namen" => "Descriptionn"}s
        t.string :stunts
        # Total refresh, before Stunt and Extra subtractons
        t.integer :refresh
        # Extras, hash of hashes: {"Name" => {"Cost" => refresh_cost, "Description" => "Full_desc"}}
        t.string :extras
        # Consequences, hash of hashes: {"Shared" => {"Sizes" => [-2, -4, -6], "Used" => [false, false, false], "Name" => ["name", "name", "name"]}}
        t.string :consequences
        # Stress tracks, hash of hashes: {"Name" => {Value => boolean}}
        t.string :stress_tracks
        # Physical description - String
        t.string :physical_description
        # Personality
        t.string :personality
        # Character backstory - String
        t.string :backstory
        # Notes - String
        t.string :notes
        # Secret Notes - String, only visible to player and GM
        t.string :secret_notes
        
        ####################################
       ## NOT YET IMPLEMENTED THINGS BELOW ##
        ####################################
       # Whether or not the character is visible to the public 
       t.string :is_public
       # Whether or not the character is an NPC
       t.string :is_npc      
      end
  end
end
