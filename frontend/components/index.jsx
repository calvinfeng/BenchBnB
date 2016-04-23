var React = require('react');
var BenchStore = require('../stores/bench_store');

var Index = React.createClass({
  getInitialState: function() {
    return { benches: BenchStore.all() };
  },

  __onChange: function() {
    this.setState({ benches: BenchStore.all() });
  },

  componentDidMount: function() {
    BenchStore.addListener(this.__onChange);
  },

  render: function() {
    var benchDisplays = [];
    var benches = this.state.benches;
    if (benches.length > 0) {
      benches.forEach(function(bench) {
        benchDisplays.push(
          <li key={bench.id}>
            Description: {bench.description}
            <ul>
              <li>Latitude: {bench.lat}</li>
              <li>Longitude: {bench.lng}</li>
            </ul>
          </li>);
      });
    }

    return (
      <div className="location-container">
        <ol>
          {benchDisplays}
        </ol>
      </div>
    );
  }

});

module.exports = Index;
