class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :authenticate_request

    private

    def authenticate_request
        session_id = request.headers['Authorization'].split(' ').last
        if session_id.blank?
            render json: { error: 'Invalid session' }, status: :unauthorized
        else
            @current_session = session_id
        end
    rescue
        render json: { error: 'Invalid session' }, status: :unauthorized
    end
end
