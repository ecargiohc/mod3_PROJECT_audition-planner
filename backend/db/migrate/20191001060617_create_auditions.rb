class CreateAuditions < ActiveRecord::Migration[6.0]
  def change
    create_table :auditions do |t|
      t.string :orchestra
      t.string :position
      t.string :date
      t.string :excerpts
      t.references :musician, null: false, foreign_key: true

      t.timestamps
    end
  end
end
