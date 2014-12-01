class FateGame < ActiveRecord::Base
  serialize :character_ids
  serialize :player_ids
  serialize :gms
  serialize :skill_list
  serialize :stress_tracks
  serialize :consequences
  serialize :aspects
end