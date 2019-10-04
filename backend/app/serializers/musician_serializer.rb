class MusicianSerializer < ActiveModel::Serializer
  attributes :id, :name, :instrument
  has_many :auditions
end
