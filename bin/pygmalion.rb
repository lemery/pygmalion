require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'bcrypt'
require 'json'
require 'sinatra/content_for'
require 'sass'
require 'sass/plugin/rack'
require 'bootstrap-sass'

require_relative '../lib/auth/auth_functions'
require_relative '../lib/auth/account_management'

require_relative '../lib/games/fate_game_functions'
require_relative '../lib/games/fate_games'

require_relative '../lib/characters/fate_characters'

Bundler.require

require_relative '../lib/db/models/User'
require_relative '../lib/db/models/FateGame'

enable :sessions
  
register Sinatra::AccountManagement

register Sinatra::Games::FateGames

register Sinatra::Characters::FateCharacters 
  
configure :development do
  require 'better_errors'
  use BetterErrors::Middleware
  # you need to set the application root in order to abbreviate filenames
  # within the application:
  BetterErrors.application_root = File.expand_path('../..', __FILE__)
end

set :app_file, __FILE__
set :root, File.expand_path('../..', __FILE__)
set :public_dir, Proc.new { File.join(root, '/lib/site') }
set :views, Proc.new { File.join(root, '/lib/site/views') }

# Sass inclusion
Sass::Plugin.options[:style] = :compressed
Sass::Plugin.options[:css_location] = '../lib/site/css'
use Sass::Plugin::Rack
  
get '/' do
  redirect to('/view/games')
end
  