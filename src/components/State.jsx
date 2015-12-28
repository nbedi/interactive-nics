var React = require('react');
var _ = require('underscore');

var State = React.createClass({
  render: function() {
    var name = this.props.name;
    var state = _.chain(this.props.data)
                      .filter(function(f) {
                        return f.state == name;
                      })
                      .groupBy('state')
                      .map(function(value, key) {
                          return {
                              state: key,
                              data: _.sortBy(value, 'month').reverse()
                          }
                      })
                      .sort(function(a, b){
                        return parseInt(b.data[0].totals) - parseInt(a.data[0].totals);
                      })
                      .map(function(m) {
                          return (
                            <p key={m.state}>
                              {JSON.stringify(m)}
                            </p>
                          );
                      })
                      .value();
    return (
      <div className="state">
        {state}
      </div>
    );
  }
});

module.exports = State;
