# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141202035810) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fate_characters", force: true do |t|
    t.integer "player_id"
    t.integer "game_id"
    t.string  "charname"
    t.string  "charpic"
    t.string  "aspects"
    t.string  "skills"
    t.string  "stunts"
    t.integer "refresh"
    t.string  "extras"
    t.string  "consequences"
    t.string  "stress_tracks"
    t.string  "physical_description"
    t.string  "personality"
    t.string  "backstory"
    t.string  "notes"
    t.string  "secret_notes"
  end

  create_table "fate_games", force: true do |t|
    t.string  "name"
    t.string  "setting_name"
    t.string  "character_ids"
    t.string  "player_ids"
    t.string  "gms"
    t.boolean "requires_approval"
    t.string  "skill_list"
    t.string  "stress_tracks"
    t.string  "consequences"
    t.string  "aspects"
    t.integer "total_refresh"
    t.integer "stunts"
    t.integer "max_stunts"
    t.integer "skill_points"
    t.string  "skill_arrangement"
  end

  create_table "users", force: true do |t|
    t.string  "username"
    t.string  "password"
    t.boolean "globalAdmin"
  end

end
