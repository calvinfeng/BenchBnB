var AppDispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench_constants');

var Store = require('flux/utils').Store;
var BenchStore = require('./bench_store');
var MarkerStore = new Store(AppDispatcher);

var _markers = [];
MarkerStore.all = function() {
  return _markers.slice();
};

MarkerStore.resetMarkers = function() {
  var locations;
  this.deleteMarkers();
  locations = BenchStore.all();
  for (var i = 0; i < locations.length; i++) {
    this.addMarker(locations[i]);
  }
};

MarkerStore.setMapOnMarkers = function(map) {
  for (var i = 0; i < _markers.length; i++) {
    _markers[i].setMap(map);
  }
};

MarkerStore.addMarker = function(position) {
  var marker = new google.maps.Marker({
    position: { lat: position.lat, lng: position.lng },
    map: this.map,
    title: position.description
  });
  // CLICK EVENT LISTENER
  // marker.addListener('click', function() {
  //   marker.setAnimation(google.maps.Animation.BOUNCE);
  //   setTimeout(function() {
  //     marker.setAnimation(null);
  //   }, 1400);
  // });
  _markers.push(marker);
};

MarkerStore.deleteMarkers = function() {
  this.clearMarkers();
  _markers = [];
};

MarkerStore.clearMarkers = function() {
  this.setMapOnMarkers(null);
};

MarkerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCH_SELECTED:
      _markers[payload.benchIndex].setAnimation(google.maps.Animation.BOUNCE);
      break;
    case BenchConstants.BENCH_DESELECTED:
      _markers[payload.benchIndex].setAnimation(null);
      break;
  }
};


module.exports = MarkerStore;
