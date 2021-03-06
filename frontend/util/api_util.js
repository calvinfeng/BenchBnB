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
  },

  createBench: function(bench) {
    $.ajax({
      method: "POST",
      url: "api/benches",
      data: {bench: bench},
      success: function(response) {
        console.log("Bench created!");
      }
    });
  }

};

module.exports = ApiUtil;
