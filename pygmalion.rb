require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'bcrypt'

Bundler.require

require './models/User'

enable :sessions

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
  erb :index
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
  login_attempt = User.find_by_username!("#{params[:user_name]}")
  if login_attempt.password == "#{params[:password_attempt]}"
    log_in(login_attempt)
    redirect to("/")
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