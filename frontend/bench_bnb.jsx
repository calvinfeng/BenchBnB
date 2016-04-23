var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('./util/api_util');

var Index = require('./components/index');
var Map = require('./components/map');

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(
    <div className="app">
      <Index/>
      <Map/>
    </div>,
    document.getElementById("content")
  );
});
