class Message < ApplicationRecord
    def self.find_all_by_session_id(session_id)
        Message.all.select{ |msg| msg[:session_id] = session_id }.sort{ |x, y| y[:id] - x[:id] }
    end
end
