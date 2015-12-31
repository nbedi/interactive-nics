// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var createHashHistory = require('history/lib/createHashHistory');
var _ = require('underscore');
var data = require('../nics.json');

var State = require('./components/State.jsx');
var StateList = require('./components/StateList.jsx');

var history = createHashHistory({
  queryKey: false
});

var Summary = React.createClass({  
  render: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return (
      <div className="summary">
        <h1>FBI NICS Firearm Background Check Data</h1>
        <StateList data={data} />
      </div>
    );
  }
});

var Detail = React.createClass({  
  render: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var name = this.props.params.name;
    var filtered = _.chain(data)
                      .filter(function(f) {
                        return f.state.replace(' ', '') == name;
                      })
                      .value();
    return (
      <div className="detail">
        <State data={filtered} />
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
