var React = require('react');
var BenchStore = require('../stores/bench_store');
var MarkerStore = require('../stores/marker_store');
var ClientActions = require('../actions/client_actions');
var hashHistory = require('react-router').hashHistory;

var _markers = [];
var Map = React.createClass({

  __onChange: function() {
    var locations;
    MarkerStore.resetMarkers();
    MarkerStore.setMapOnMarkers(this.map);
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
    this.map.addListener('click', this.mapClickHandle);
  },
  
  mapClickHandle: function(e) {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    console.log(lat, lng);
    hashHistory.push({
      pathname: "benches/new",
      query: {lat: lat, lng: lng}
    });
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

  render: function() {
    return (
      <div className="map" ref="map"></div>
    );
  }
});

module.exports = Map;
