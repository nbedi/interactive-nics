var React = require('react');
var _ = require('underscore');

var State = React.createClass({
  render: function() {
    var state = _.chain(this.props.data)
                      .sortBy('month')
                      .reverse()
                      .map(function(m) {
                        var columns = _.map(m, function(value, key){
                                          return (
                                              <td>{value}</td>
                                              );
                                        });
                        return (<tr>{columns}</tr>);
                      })
                      .value();
    
    var stateHeaders = _.chain(this.props.data[0])
                        .keys()
                        .map(function(m){
                          return (<th>{m}</th>);
                        })
                        .value();
    return (
      <div className="state">
        <a href="/#/">Back</a>
        <h1>{this.props.data[0].state}</h1>
        <table>
          <thead><tr id="stateHeaders">{stateHeaders}</tr></thead>
          <tbody><tr key={this.props.data[0].month}>{state}</tr></tbody>
        </table>
      </div>
    );
  }
});

module.exports = State;
