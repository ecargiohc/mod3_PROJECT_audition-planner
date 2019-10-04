class MusiciansController < ApplicationController

    def index
        render json: Musician.all
    end

    def show
        musician = Musician.find(params[:id])
        render json: {name: musician.name, instrument: musician.instrument} 
    end

    def create
        musician = Musician.find_or_create_by(name: params[:audition][:musician_name])

        if musician.save
            render json: { status: 'SUCCESS' }
        else
            puts musician.errors.details
            render json: { status: 'ERROR' }
        end
    end

    def edit
        musician = Musician.find(params[:id])
    end

    def update
        musician = Musician.find(params[:id])
        # musician.update(musician_params)
        render json: musician
    end

    def destroy
        musician = Musician.find(params[:id])
        musician.destroy
    end

    private

    def musician_params
        params.require(:musician).permit(:name, :instrument)
    end
end
