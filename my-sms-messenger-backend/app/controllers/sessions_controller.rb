class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :create
    skip_before_action :authenticate_request, only: :create

    def create
        session_id = SecureRandom.hex(16)
        render json: { session_id: session_id }, status: :created
    end

    def show
        session_id = request.headers['Authorization'].split(' ').last
        render json: { session_id: session_id }, status: :ok
    rescue
        render json: { error: 'Invalid session' }, status: :unauthorized
    end
end
