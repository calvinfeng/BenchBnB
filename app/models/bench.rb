class Bench < ActiveRecord::Base
  validates :description, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

  def self.in_bounds(bounds)
    # format
    # {
    #   "northEast" => {"lat" => number, "lng" => number},
    #   "southWest" => {"lat" => number, "lng" => number}
    # }
    north_bound = bounds["northEast"]["lat"]
    east_bound = bounds["northEast"]["lng"]
    south_bound = bounds["southWest"]["lat"]
    west_bound = bounds["southWest"]["lng"]
    Bench.where(lat: south_bound..north_bound).where(lng: west_bound..east_bound)
  end
end
