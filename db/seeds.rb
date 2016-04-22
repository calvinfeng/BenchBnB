# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Here are some seed data
locations = [
  {
    description: "160 Spear St. - App Academy",
    lat: 37.791305,
    lng: -122.393735
  },
  {
    description: "Embarcadero BART Station",
    lat: 37.792905,
    lng: -122.397059
  },
  {
    description: "West Oakland BART Station",
    lat: 37.804873,
    lng: -122.295140
  }
]

locations.each do |location|
  Bench.create!(location)
end
