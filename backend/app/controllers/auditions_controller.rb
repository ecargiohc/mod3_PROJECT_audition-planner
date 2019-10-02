class AuditionsController < ApplicationController
    
    def index 
        render json: Audition.all
    end

    def show
        audition = Audition.find(params[:id])
        render json: {musician: audition.musician_id, name: audition.orchestra, date: audition.date,excerpts: audition.excerpts } 
    end

    def create
    end

    def edit
    end

    def update
    end

    def delete
    end

    def single_show
        render json: Audition.where("musician_id": params[:musician_id])
    end
end
