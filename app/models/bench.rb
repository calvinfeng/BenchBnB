class Bench < ActiveRecord::Base
  validates :description, presence: true
  validates :lat, presence: true
  validates :lng, presence: true
  
end
