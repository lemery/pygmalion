require 'rubygems'
require 'bundler/setup'
require 'sinatra'

Bundler.require

get '/' do
  erb :index
end