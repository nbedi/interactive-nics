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
    return (
      <div className="app">
        <h1>FBI NICS Firearm Background Check Data</h1>
          <p>
            <span>Data from the </span>
            <a href="https://www.fbi.gov/about-us/cjis/nics">
              FBI's National Instant Criminal Background Check System
            </a>
            <span> and parsed by </span> 
            <a href="https://github.com/BuzzFeedNews/nics-firearm-background-checks#fbi-nics-firearm-background-check-data">
              Buzzfeed News
            </a>
          </p>
          <p>
            <a href="https://github.com/BuzzFeedNews/nics-firearm-background-checks#notes-on-the-data">
              More about the data from Buzzfeed
            </a>
          </p>
        <StateList data={data} />
      </div>
    );
  }
});

var Detail = React.createClass({  
  render: function() {
    var name = this.props.params.name;
    var filtered = _.chain(data)
                      .filter(function(f) {
                        return f.state.replace(' ', '') == name;
                      })
                      .value();
    return (
      <div className="app">
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
