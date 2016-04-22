var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchBenches: function() {
    ApiUtil.fetchBenches();
  }
};

module.exports = ClientActions;
