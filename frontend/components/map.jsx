var React = require('react');
var BenchStore = require('../stores/bench_store');
var ClientActions = require('../actions/client_actions');

var _markers = [];
var Map = React.createClass({

  __onChange: function() {
    var locations = BenchStore.all();
    var self = this;

    locations.forEach(function(location) {
      var marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: self.map,
        title: location.description
      });
      _markers.push(marker);
    });

    _markers.forEach(function(marker) {
      marker.setMap(self.map);
    });
  },

  componentDidMount: function() {
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    BenchStore.addListener(this.__onChange);

    var self = this;
    this.map.addListener('idle', function() {
      var LatLngBounds = self.map.getBounds();

      var northEastBounds = {
        lat: LatLngBounds.getNorthEast().lat(),
        lng: LatLngBounds.getNorthEast().lng()
      };

      var southWestBounds = {
        lat: LatLngBounds.getSouthWest().lat(),
        lng: LatLngBounds.getSouthWest().lng()
      };

      var bounds = {
        "northEast": northEastBounds,
        "southWest": southWestBounds
      };
      ClientActions.fetchBenches(bounds);
    });
  },

  render: function() {
    return (
      <div className="map-container">
        <div className="map" ref="map"></div>
      </div>
    );
  }


});

module.exports = Map;
