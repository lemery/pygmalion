require 'sinatra/base'

module Sinatra
  module Characters
    module FateCharacters
      def self.registered(app)
        app.get '/make/character/fate' do
          erb :'chars/fate_char'
        end
      end
    end
  end
end