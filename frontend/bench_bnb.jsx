var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('./util/api_util');

var Index = require('./components/index');
var BenchForm = require('./components/bench_form');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var App = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Router history={hashHistory}>
    <Router path="/" component={App}>
      <IndexRoute component={Index}/>
      <Router path="/benches/new" component={BenchForm}>
      </Router>
    </Router>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(
    routes,
    document.getElementById("content")
  );
});
