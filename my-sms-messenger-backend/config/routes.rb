Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  post '/messages', to: 'messages#create'
  post '/messages/all', to: 'messages#show'
end
