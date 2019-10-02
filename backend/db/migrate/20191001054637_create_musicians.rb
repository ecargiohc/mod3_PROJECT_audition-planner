class CreateMusicians < ActiveRecord::Migration[6.0]
  def change
    create_table :musicians do |t|
      t.string :name
      t.string :instrument

      t.timestamps
    end
  end
end
