var React = require('react');
var _ = require('underscore');

var StateList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  filter: function(event) {
    var filtered = _.chain(this.props.data)
                    .filter(function(f){
                      return f.state.toLowerCase().indexOf(
                        event.target.value.toLowerCase()
                      )>-1;
                    });
    this.setState({data: filtered});
  },
  render: function() {
    var stateNodes = _.chain(this.state.data)
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
                            <p id={m.state} key={m.state}>
                              <a href={"/#/"+m.state.replace(' ','')}><span>{m.state}</span></a>
                              <span> {m.data[0].totals}</span>
                            </p>
                          );
                      })
                      .value();
    return (
      <div className="stateList">
        <input id="stateFilter" onChange={this.filter}/>
        {stateNodes}
      </div>
    );
  }
});

module.exports = StateList;
