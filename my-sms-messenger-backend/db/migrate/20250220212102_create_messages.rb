class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages, primary_key: :message_id do |t|
      t.string :session_id
      t.string :body
      t.string :from
      t.string :to

      t.timestamps
    end
  end
end
