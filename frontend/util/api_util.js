var ServerActions = require('../actions/server_actions');

var ApiUtil = {
  fetchBenches: function(bounds) {
    $.ajax({
      method: "GET",
      url: "api/benches",
      data: {bounds: $.param(bounds)},
      success: function(benches) {
        ServerActions.receiveAll(benches);
        console.log("Request Successful");
      },
      error: function(errors) {
        console.log(errors);
      }
    });
  }
};

module.exports = ApiUtil;
