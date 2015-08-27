require 'sinatra/base'

module Sinatra  
  module AccountManagement
    def self.registered(app)
      app.get '/auth/signup' do
        erb :'auth/signup'
      end
      
      app.post '/auth/signup' do
        if "#{params[:user_password]}" != "#{params[:user_password_confirmation]}"
          flash[:password_match_fail] = "Passwords did not match"
        else
          if User.exists?(:username => "#{params[:user_name]}")
            flash[:username_taken] = "Username already taken"
          else
            create_user(params)
            log_in(user)
            redirect to('/')
          end
        end
        redirect to('/auth/signup')
      end
      
      app.get '/auth/login' do
        erb :'auth/login'
      end
      
      app.post '/auth/login' do
        if User.exists?(:username => "#{params[:user_name]}")
          login_attempt = User.find_by_username!("#{params[:user_name]}")
          if login_attempt.password == "#{params[:password_attempt]}"
            log_in(login_attempt)
            redirect to("/")
          else
            flash[:incorrect] = "Username or password invalid"
            redirect to('/auth/login')
          end
        else
          flash[:incorrect] = "Username or password invalid"
          redirect to('/auth/login')
        end
      end
      
      app.get '/auth/logout' do
        session[:username] = nil
        session[:admin] = false
        session[:logged_in] = false
        redirect to('/')
      end
      
      app.get '/auth/restricted' do
        erb :'auth/restricted'
      end
    end
  end
  
  register AccountManagement
end  