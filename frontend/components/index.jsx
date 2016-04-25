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

  mouseEnterHandler: function(e) {
    e.currentTarget.className = "highlight";
  },

  mouseLeaveHandler: function(e) {
    e.currentTarget.className = "";
  },

  render: function() {
    var benchDisplays = [];
    var benches = this.state.benches;
    var self = this;
    if (benches.length > 0) {
      benches.forEach(function(bench) {
        benchDisplays.push(
          <li
            key={bench.id}
            onMouseEnter={self.mouseEnterHandler} 
            onMouseLeave={self.mouseLeaveHandler}
          >
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
