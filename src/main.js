// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var data = require('../nics.json');

var StateList = require('./components/StateList.jsx');

var App = React.createClass({  
  render: function() {
    return (
      <div className="app">
        <StateList data={this.props.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <App data={data} />,
  document.getElementById('react')
);
