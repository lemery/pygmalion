require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'bcrypt'
require 'json'

Bundler.require

require './models/User'
require './models/FateGame'

enable :sessions

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

def username
  return session[:username]
end

def logged_in?
  if (session[:logged_in])
    return true
  else
    return false
  end
end

def restricted
  redirect to('/auth/restricted')
end

def userid (user)
  return User.find_by(username: user).id
end

def log_in (user)
  session[:logged_in] = true
  session[:username] = user.username
  session[:admin] = user.globalAdmin
end

get '/' do
  @task = "Make"
  erb :fategame
end

get '/auth/signup' do
  erb :signup
end

post '/auth/signup' do
  if "#{params[:user_password]}" != "#{params[:user_password_confirmation]}"
    flash[:password_match_fail] = "Passwords did not match"
  else
    if User.exists?(:username => "#{params[:user_name]}")
      flash[:username_taken] = "Username already taken"
    else
      user = User.new
      user.username = "#{params[:user_name]}"
      user.password = BCrypt::Password.create("#{params[:user_password]}") 
      user.globalAdmin = user.username == "Admin"
      user.save
      log_in(user)
      redirect to('/')
    end
  end
  redirect to('/auth/signup')
end

get '/auth/login' do
  erb :login
end

post '/auth/login' do
  if User.exists?(:username => "#{params[:user_name]}")
    login_attempt = User.find_by_username!("#{params[:user_name]}")
    if login_attempt.password == "#{params[:password_attempt]}"
      log_in(login_attempt)
      redirect to("/")
    else
      redirect to('/auth/login')
    end
  else
    flash[:incorrect] = "Username or password invalid"
    redirect to('/auth/login')
  end
end

get '/auth/logout' do
  session[:username] = nil
  session[:admin] = false
  session[:logged_in] = false
  redirect to('/')
end

get '/auth/restricted' do
  erb :restricted
end

get '/make/game/fate' do
  @task = "Make"
  erb :fategame
end

post '/make/game/fate' do
  if (logged_in?)
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
      size_arr = params[tnames[1]].to_s.split(', ')
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
        gms_array.push(User.where(username: params[temp_string]).id)
      end
    end
    game.gms = gms_array
    # Players
    num_players = params[:num_players].to_i
    players_array = []
    for i in 0...num_players
      temp_string = "player_username_" + i.to_s
      if (User.where(username: params[temp_string].to_s).exists?)
        players_array.push(User.where(username: params[temp_string]).id)
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
    redirect_url = "/view/games/fate/" + game.name
    game.save
    redirect to(redirect_url)
  else 
    restricted  
  end
end

get '/view/games/fate/:gamename' do
  if (FateGame.exists?(:name => "#{params[:gamename]}"))
    @task = "View"
    @game = FateGame.where(name: "#{params[:gamename]}").first()
  else
    @name = "\"#{params[:gamename]}\""
    erb :nogame
  end
  erb :fategame
end

get '/view/games' do
  @system_names = ["Fate"]
  @games = []
  @games.push(FateGame.count > 0 ? FateGame.order(:name).limit(10) : false)
  erb :viewgames
end