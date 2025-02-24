class MessageSerializer < ActiveModel::Serializer
  attributes :message_id, :session_id, :body, :from, :to, :created_at
end
