var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench_constants');

var MarkerStore = new Store(AppDispatcher);
var _markers = [];

MarkerStore.all = function() {
  return _markers.slice();
};
