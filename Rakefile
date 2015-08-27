require "sinatra/activerecord/rake"
require "./bin/pygmalion" # change this if your app file is something other than "app.rb"
require 'yaml'
require 'logger'

include ActiveRecord::Tasks

class Seeder
  def initialize(seed_file)
    @seed_file = seed_file
  end

  def load_seed
    raise "Seed file '#{@seed_file}' does not exist" unless File.file?(@seed_file)
    load @seed_file
  end
end


root = File.expand_path '..', __FILE__
DatabaseTasks.env = ENV['ENV'] || 'development'
DatabaseTasks.database_configuration = YAML.load(File.read(File.join(root, 'config/database.yml')))
DatabaseTasks.db_dir = File.join root, 'lib/db'
DatabaseTasks.fixtures_path = File.join root, 'spec/fixtures'
DatabaseTasks.migrations_paths = [File.join(root, 'lib/db/migrate')]
DatabaseTasks.seed_loader = Seeder.new File.join root, 'lib/db/seeds.rb'
DatabaseTasks.root = root

task :environment do
  ActiveRecord::Base.configurations = DatabaseTasks.database_configuration
  ActiveRecord::Base.establish_connection DatabaseTasks.env.to_sym
end