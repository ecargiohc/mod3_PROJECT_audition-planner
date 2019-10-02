class AuditionsController < ApplicationController
    
    def index 
        render json: Audition.all
    end

    def show
        audition = Audition.find(params[:id])
        render json: {musician: audition.musician_id, name: audition.orchestra, date: audition.date, excerpts: audition.excerpts } 
    end

    def new
    end

    def create
    #     byebug
        musician = Musician.find_or_create_by(name: params[:musician_name])
        audition = Audition.new(audition_params)
        audition.musician = musician
        
        if audition.save
            render json: { status: 'SUCCESS' }
        else
            # byebug
            puts audition.errors.details
            render json: { status: 'ERROR' }
        end
    end

    def edit
    end

    def update
        audition = Audition.find(params[:id])
        # if audition.update(audition_params)
        #     render json: { status: 'SUCCESS'}
        # else
        #     render json: { status: 'SUCCESS'}
        # end
    end

    def destroy
        audition = Audition.find(params[:id])
        # byebug
        audition.destroy
        # render json: Audition.where("musician_id": params[:musician_id])
    end

    def single_show
        render json: Audition.where("musician_id": params[:musician_id])
    end

    private

    def audition_params
        params.require(:audition).permit(:orchestra, :position, :date, :excerpts)
    end
end
