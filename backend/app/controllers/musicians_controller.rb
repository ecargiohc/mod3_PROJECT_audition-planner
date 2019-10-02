class MusiciansController < ApplicationController

    def index
        render json: Musician.all
    end

    def show
        musician = Musician.find(params[:id])
        render json: {name: musician.name, instrument: musician.instrument} 
    end

    def create
    end

    def edit
    end

    def update
    end

    def delete
    end
end
