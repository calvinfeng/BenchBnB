var React = require('react');
var BenchStore = require('../stores/bench_store');
var ClientActions = require('../actions/client_actions');

var Index = React.createClass({
  getInitialState: function() {
    return { benches: BenchStore.all() };
  },

  __onChange: function() {
    this.setState({ benches: BenchStore.all() });
  },

  componentDidMount: function() {
    BenchStore.addListener(this.__onChange);
    ClientActions.fetchBenches();
  },

  render: function() {
    var benchDisplays = [];
    var benches = this.state.benches;
    if (benches.length > 0) {
      benches.forEach(function(bench) {
        benchDisplays.push(
          <div key={bench.id}>
            Description: {bench.description}
            <ul>
              <li>Latitude: {bench.lat}</li>
              <li>Longitude: {bench.lng}</li>
            </ul>
          </div>);
      });
    }
    return (
      <div>
        {benchDisplays}
      </div>
    );
  }

});

module.exports = Index;