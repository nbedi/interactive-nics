var React = require('react');
var _ = require('underscore');

var State = React.createClass({
  render: function() {
    var state = _.chain(this.props.data)
                      .sortBy('month')
                      .reverse()
                      .map(function(m) {
                          return (
                            <p id={m.month} key={m.month}>
                              <span>{m.month}</span>
                              <span> {m.totals}</span>
                            </p>
                          );
                      })
                      .value();
    return (
      <div className="state">
        <a href="/#/">Back</a>
        <h1>{this.props.data[0].state}</h1>
        {state}
      </div>
    );
  }
});

module.exports = State;
