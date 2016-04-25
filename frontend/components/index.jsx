var React = require('react');
var BenchStore = require('../stores/bench_store');
var MouseActions = require('../actions/mouse_actions');

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
    MouseActions.selectBench(parseInt(e.currentTarget.id));
  },

  mouseLeaveHandler: function(e) {
    e.currentTarget.className = "";
    MouseActions.deselectBench(parseInt(e.currentTarget.id));
  },

  render: function() {
    var benchDisplays = [];
    var benches = this.state.benches;
    var self = this;
    if (benches.length > 0) {
      for (var i = 0; i < benches.length; i ++) {
        benchDisplays.push(
          <li id={i} key={benches[i].id}
            onMouseEnter={self.mouseEnterHandler}
            onMouseLeave={self.mouseLeaveHandler}>
            Description: {benches[i].description}
            <ul>
              <li>Latitude: {benches[i].lat}</li>
              <li>Longitude: {benches[i].lng}</li>
            </ul>
          </li>
        );
      }
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
