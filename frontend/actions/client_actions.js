var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchBenches: function(bounds) {
    ApiUtil.fetchBenches(bounds);
  },

  createBench: function(bench) {
    ApiUtil.createBench(bench);
  }

};

module.exports = ClientActions;
