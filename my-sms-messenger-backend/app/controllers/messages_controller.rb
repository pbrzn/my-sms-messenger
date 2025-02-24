class MessagesController < ApplicationController
    before_action :set_twilio_client

  def create
    @message = Message.new(message_params)
    @message.to = ENV['TWILIO_PHONE_NUMBER'].sub('+1','');
    if @message.save
      send_message(@message)
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end
  
  def show
    @messages = Message.find_all_by_session_id(message_params[:session_id])
    render json: @messages
  end

  private

  def set_twilio_client
    @client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
  end

  def send_message(message)
    _from = ''.concat('+1', message.from.sub(/[-.]/, ''))
    @client.messages.create(
      from: _from,
      to: ENV['TWILIO_PHONE_NUMBER'],
      body: message.body
    )
  end

  def message_params
    params.require(:message).permit(:from, :body, :session_id)
  end
end
