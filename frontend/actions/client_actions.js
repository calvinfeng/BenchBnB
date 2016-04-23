var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchBenches: function(bounds) {
    ApiUtil.fetchBenches(bounds);
  }
};

module.exports = ClientActions;
