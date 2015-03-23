require 'sinatra/base'

module Sinatra
  module UserFunctions
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
  end
  
  helpers UserFunctions
end