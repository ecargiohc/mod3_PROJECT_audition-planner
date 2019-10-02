Rails.application.routes.draw do
  resources :auditions
  resources :musicians
  # get '/auditions' => 'auditions#index'
  get '/auditions/:id' => 'auditions#show'
  get '/auditions/musician/:musician_id' => 'auditions#single_show'
  delete '/auditions/musician/:musician_id' => 'auditions#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root to: 'auditions#index'
end
