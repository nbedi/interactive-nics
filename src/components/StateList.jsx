var React = require('react');
var _ = require('underscore');

var StateList = React.createClass({
  render: function() {
    var stateNodes = _.chain(this.props.data)
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
                              <a href={"/#/"+m.state.replace(' ','')}><span>{m.state}</span></a>
                              <span> {m.data[0].totals}</span>
                            </p>
                          );
                      })
                      .value();
    return (
      <div className="stateList">
        {stateNodes}
      </div>
    );
  }
});

module.exports = StateList;
