Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :create]
    resource :user, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy]
  end
end
