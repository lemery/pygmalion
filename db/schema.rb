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

ActiveRecord::Schema.define(version: 20141111223822) do

  create_table "fate_games", force: true do |t|
    t.string  "name"
    t.integer "character_ids"
    t.integer "player_ids"
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
