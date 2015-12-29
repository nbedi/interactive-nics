var React = require('react');
var _ = require('underscore');

var StateList = React.createClass({
  getInitialState: function() {
    var initial = group(this.props.data)
                      .sort(function(a, b){
                        return parseInt(b.totals) - parseInt(a.totals);
                      })
                      .value();
    return {
      data: initial
    }
  },
  filter: function(event) {
    var filtered = group(_.chain(this.props.data)
                    .filter(function(f){
                      return f.state.toLowerCase().indexOf(
                        event.target.value.toLowerCase()
                      )>-1;
                    })
                    .value());
    this.setState({data: filtered});
  },
  sort: function(event) {
    Array.prototype.slice
          .call(document.getElementsByTagName('th'))
          .forEach(function(th) {
            th.setAttribute('sorted', 'false')
          });
    var sorted = _.chain(this.state.data)
                    .sortBy(event.target.id)
                    .value();
    event.target.setAttribute('sorted', 'true')
    if (event.target.className == "asc") {
      event.target.className = "desc";
    } else {
      sorted.reverse();
      event.target.className = "asc";
    }
    this.setState({data: sorted});
  },
  render: function() {
    var stateNodes = _.chain(this.state.data)                      
                      .map(function(m) {
                          return (
                            <tr id={m.state} key={m.state}>
                              <td><a href={"/#/"+m.state.replace(' ','')}>{m.state}</a></td>
                              <td>{m.permit}</td>
                              <td>{m.handgun}</td>
                              <td>{m.long_gun}</td>
                              <td>{m.other}</td>
                              <td>{m.multiple}</td>
                              <td>{m.totals}</td>
                            </tr>
                          );
                      })
                      .value();
    return (
      <div className="stateList">
        <input id="stateFilter" onChange={this.filter} placeholder="Enter state name"/>
        <p>Showing data from {this.state.data[0].month}</p>
        <p>Click on state names for complete details per state</p>
        <table>
          <thead>
            <tr>
              <th id="state" className="asc" onClick={this.sort}>Name</th>
              <th id="permit" className="asc" onClick={this.sort}>Permits</th>
              <th id="handgun" className="asc" onClick={this.sort}>Handgun</th>
              <th id="long_gun" className="asc" onClick={this.sort}>Long guns</th>
              <th id="other" className="asc" onClick={this.sort}>Other</th>
              <th id="multiple" className="asc" onClick={this.sort}>Multiple</th>
              <th id="totals" className="asc sorted" onClick={this.sort}>Totals</th>
            </tr>
          </thead>
          <tbody>{stateNodes}</tbody>
        </table>
      </div>
    );
  }
});

var group = function(data) {
  return _.chain(data)
          .groupBy('state')
          .map(function(value, key) {
            var sorted = _.sortBy(value, 'month').reverse();
              return _.extend({}, {state: key}, sorted[0])
          });
};

module.exports = StateList;
