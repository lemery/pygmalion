class FateCharacter < ActiveRecord::Base
   serialize :aspects
   serialize :skills
   serialize :stunts
   serialize :extras
   serialize :consequences
   serialize :stress_tracks
end