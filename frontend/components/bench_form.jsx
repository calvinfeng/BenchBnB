var React = require('react');
var BenchStore = require('../stores/bench_store');
var ClientActions = require('../actions/client_actions');
var hashHistory = require('react-router').hashHistory;

var BenchForm = React.createClass({
  getInitialState: function() {
    return {description: "", lat: "", lng: ""};
  },

  createBench: function(e) {
    e.preventDefault();
    ClientActions.createBench({
      description: this.state.description,
      lat: this.props.location.query.lat,
      lng: this.props.location.query.lng
    });
    this.setState({description: "", lat: "", lng: ""});
  },

  descriptionChange: function(event) {
    this.setState({description: event.target.value});
  },

  latChange: function(event) {
    this.setState({lat: event.target.value});
  },

  lngChange: function(event) {
    this.setState({lng: event.target.value});
  },

  redirectHome: function() {
    hashHistory.push(
      {
        pathname: "/"
      }
    );
  },

  render: function() {
    return (
      <form className='new-bench' onSubmit={this.createBench}>
        <div>
          <label htmlFor='bench_description'>Description:   </label>
          <input id='bench_description'
                 type='text'
                 onChange={this.descriptionChange}
                 value={this.state.description}/>
        </div>

        <div>
          <label htmlFor='bench_lat'>Latitude:</label>
          <input id='bench_lat'
                 type='float'
                 value={this.props.location.query.lat}
                 disabled={true}/>
        </div>

        <div>
          <label htmlFor="bench_lng">Longtitude:</label>
          <input id='bench_lng'
                 type='float'
                 value={this.props.location.query.lng}
                 disabled={true}/>
        </div>

        <input type="submit" value="Create New Bench"/>
        <button onClick={this.redirectHome}>Cancel</button>
      </form>
    );
  }
});

module.exports = BenchForm;
