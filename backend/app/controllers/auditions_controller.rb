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
        # byebug
        musician = Musician.find_or_create_by(name: params[:audition][:musician_name], instrument: params[:audition][:instrument])
        audition = Audition.create(audition_params)
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
        audition = Audition.find(params[:id])
    end

    def update
        audition = Audition.find(params[:id])
        audition.update(audition_params)
        if audition.update(audition_params)
            render json: { status: 'SUCCESS'}
            render json: audition
        else
            render json: { status: 'FAILED'}
        end
    end

    def destroy
        # musician = Audition.where("musician_id": params[:musician_id])
        audition = Audition.find(params[:id])
        # byebug
        # audition = Audition.where("musician_id = ? AND id = ?", params[:musician_id], params[:id])
        # # byebug
        # puts audition
        audition.destroy
    end

    def single_show
        render json: Audition.where("musician_id": params[:musician_id])
    end

    private

    def audition_params
        params.require(:audition).permit(:orchestra, :position, :date, :excerpts)
    end
end
