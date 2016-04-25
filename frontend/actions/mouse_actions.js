var AppDispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench_constants');

var MouseActions = {
  selectBench: function(benchIndex) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_SELECTED,
      benchIndex: benchIndex
    });
  },

  deselectBench: function(benchIndex) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_DESELECTED,
      benchIndex: benchIndex
    });
  }
};

module.exports = MouseActions;
