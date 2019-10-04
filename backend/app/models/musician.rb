class Musician < ApplicationRecord
    has_many :auditions, dependent: :destroy
end
