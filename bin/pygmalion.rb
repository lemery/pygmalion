require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'bcrypt'
require 'json'
require 'sinatra/content_for'

require_relative '../lib/auth/auth_functions'
require_relative '../lib/auth/account_management'

require_relative '../lib/games/fate_game_functions'
require_relative '../lib/games/fate_games'

require_relative '../lib/characters/fate_characters'

Bundler.require

require '../lib/db/models/User'
require '../lib/db/models/FateGame'

enable :sessions
  
register Sinatra::AccountManagement

register Sinatra::Games::FateGames

register Sinatra::Characters::FateCharacters 
  
configure :development do
  require 'better_errors'
  use BetterErrors::Middleware
  # you need to set the application root in order to abbreviate filenames
  # within the application:
  BetterErrors.application_root = File.expand_path('..', __FILE__)
end
  
if ENV['DATABASE_URL']
  ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
else
  ActiveRecord::Base.establish_connection(
    :adapter => 'sqlite3',
    :database => 'db/development.db',
    :encoding => 'utf8'
  )
end
  
get '/' do
  redirect to('/view/games')
end
  