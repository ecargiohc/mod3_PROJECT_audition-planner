class MusiciansController < ApplicationController

    def index
        render json: Musician.all
    end

    def show
        musician = Musician.find(params[:id])
        render json: {name: musician.name, instrument: musician.instrument} 
    end

    def create
        musician = Musician.new(musician_params)

        if musician.save
            render json: { status: 'SUCCESS' }
        else
            puts musician.errors.details
            render json: { status: 'ERROR' }
        end
    end

    def edit
    end

    def update
    end

    def destroy
    end

    private

    def musician_params
        params.require(:musician).permit(:name, :instrument)
    end
end
