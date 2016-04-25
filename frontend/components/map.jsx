var React = require('react');
var BenchStore = require('../stores/bench_store');
var ClientActions = require('../actions/client_actions');

var _markers = [];
var Map = React.createClass({

  __onChange: function() {
    var locations;

    this.deleteMarkers();
    locations = BenchStore.all();
    for(var i = 0; i < locations.length; i++) {
      this.addMarker(locations[i]);
    }
    this.setMapOnMarkers(this.map);
  },


  componentDidMount: function() {
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    BenchStore.addListener(this.__onChange);
    this.map.addListener('idle', this.refetchWhenDragged);
  },

  refetchWhenDragged: function() {
    var LatLngBounds = this.map.getBounds();

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
  },

  setMapOnMarkers: function(map) {
    for (var i = 0; i < _markers.length; i++) {
      _markers[i].setMap(map);
    }
  },

  addMarker: function(position) {
    var marker = new google.maps.Marker({
      position: { lat: position.lat, lng: position.lng },
      map: this.map,
      title: position.description
    });

    marker.addListener('click', function() {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 1400);
    });

    _markers.push(marker);
  },

  deleteMarkers: function() {
    this.clearMarkers();
    _markers = [];
  },

  clearMarkers: function() {
    this.setMapOnMarkers(null);
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
