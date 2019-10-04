class AuditionSerializer < ActiveModel::Serializer
  attributes :id, :musician_id, :orchestra, :position, :date, :excerpts
  belongs_to :musician
end
