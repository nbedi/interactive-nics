// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var createHashHistory = require('history/lib/createHashHistory')
var data = require('../nics.json');

var State = require('./components/State.jsx');
var StateList = require('./components/StateList.jsx');

var history = createHashHistory({
  queryKey: false
});

var Summary = React.createClass({  
  render: function() {
    return (
      <div className="app">
        <StateList data={data} />
      </div>
    );
  }
});

var Detail = React.createClass({  
  render: function() {
    return (
      <div className="app">
        <State data={data} name={this.props.params.name} />
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={Summary}/>
    <Route path="/:name" component={Detail} />
  </Router>
), document.getElementById('react'));
