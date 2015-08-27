class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      # Actually a BCrypt password
      t.string :password
      t.boolean :global_admin
    end
   end
end
