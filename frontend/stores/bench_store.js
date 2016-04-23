var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench_constants');

var BenchStore = new Store(AppDispatcher);
var _benches = [];

BenchStore.all = function() {
  return _benches.slice();
};

BenchStore.resetBenches = function(newBenches) {
  _benches = newBenches;
  console.log("new benches: ", _benches);
};

BenchStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      this.resetBenches(payload.benches);
      BenchStore.__emitChange();
      break;
  }
};

module.exports = BenchStore;
