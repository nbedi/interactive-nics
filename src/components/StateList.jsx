var React = require('react');
var _ = require('underscore');
var d3 = require('d3');

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
    Array.prototype.slice
          .call(document.getElementsByTagName('th'))
          .forEach(function(th) {
            th.className = 'desc ' + th.className.split(' ')[1];
            var attr = th.id == 'state' ? 'true' : 'false';
            th.setAttribute('sorted', attr);
          });
    var filtered = _.chain(group(this.props.data))
                    .filter(function(f){
                      return f.state.toLowerCase().indexOf(
                        event.target.value.toLowerCase()
                      )>-1;
                    })
                    .value();
    this.setState({data: filtered});
  },
  sort: function(event) {
    Array.prototype.slice
          .call(document.getElementsByTagName('th'))
          .forEach(function(th) {
            th.className = th.className.split(' ')[0] + ' ' + th.className.split(' ')[1];
            th.setAttribute('sorted', 'false');
          });
    var sorted = _.chain(this.state.data)
                    .sortBy(event.target.id)
                    .value();
    event.target.setAttribute('sorted', 'true')
    if (event.target.className.indexOf("asc")>-1) {
      event.target.className = "desc " + event.target.className.split(' ')[1];
    } else {
      sorted.reverse();
      event.target.className = "asc " + event.target.className.split(' ')[1];;
    }
    this.setState({data: sorted});
  },
  switch: function() {
    this.setState({data: this.state.data});
  },
  render: function() {
    var switchValue = document.querySelector('input[name="switch"]:checked');
    switchValue = !switchValue || switchValue.value == "default" ? "" : switchValue.value+"_";
    
    var rows = _.map(this.state.data, function(m) {
                          return (
                            <tr id={m.state} key={m.state}>
                              <td id="state" className="small"><a href={"#/"+m.state.replace(' ','')}>{m.state}</a></td>
                              <td id="permit" className="medium">{m.permit.toLocaleString()}</td>
                              <td id="handgun" className="medium">{m[switchValue+'handgun']?m[switchValue+'handgun'].toLocaleString():0}</td>
                              <td id="long_gun" className="medium">{m[switchValue+'long_gun']?m[switchValue+'long_gun'].toLocaleString():0}</td>
                              <td id="other" className="medium">{m[switchValue+'other']?m[switchValue+'other'].toLocaleString():0}</td>
                              <td id="multiple" className="large">{m.multiple.toLocaleString()}</td>
                              <td id="admin" className="large">{m.admin.toLocaleString()}</td>
                              <td id="delta" className="small">{m.delta.toLocaleString()}</td>
                              <td id="totals" className="small">{m.totals.toLocaleString()}</td>
                            </tr>
                          );
                      });
    var dateFormat = d3.time.format("%Y-%m");
    var prettyDateFormat = d3.time.format("%B %Y");
    return (
      <div className="stateList">
        <input id="stateFilter" onChange={this.filter} placeholder="Enter state name"/>
        <p>Data below is from {prettyDateFormat(dateFormat.parse(this.state.data[0].month))}</p>
        <p className="switchLabel medium">Category for handgun, long gun and other:</p>
        <div className="switch medium">
            <label><input value="default" name="switch" type="radio" onClick={this.switch} defaultChecked={true} />Default</label>
            <label><input value="prepawn" name="switch" type="radio" onClick={this.switch} />Prepawn</label>
            <label><input value="redemption" name="switch" type="radio" onClick={this.switch} />Redemption</label>
            <label><input value="returned" name="switch" type="radio" onClick={this.switch} />Returned</label>
            <label><input value="rentals" name="switch" type="radio" onClick={this.switch} />Rentals</label>
            <label><input value="private_sale" name="switch" type="radio" onClick={this.switch} />Private sale</label>
            <label><input value="return_to_seller" name="switch" type="radio" onClick={this.switch} />Returned (private seller)</label>
        </div>
        <table>
          <thead>
            <tr id="headers">
              <th id="state" className="desc small" onClick={this.sort}>Name</th>
              <th id="permit" className="desc medium" onClick={this.sort}>Permits</th>
              <th id="handgun" className="desc medium" onClick={this.sort}>Handgun</th>
              <th id="long_gun" className="desc medium" onClick={this.sort}>Long guns</th>
              <th id="other" className="desc medium" onClick={this.sort}>Other</th>
              <th id="multiple" className="desc large" onClick={this.sort}>Multiple</th>
              <th id="admin" className="desc large" onClick={this.sort}>Admin</th>
              <th id="delta" className="desc small" onClick={this.sort}>Change since last month</th>
              <th id="totals" className="asc small sorted" onClick={this.sort}>Totals</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
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
              return _.extend({}, {state: key, delta: sorted[0].totals-sorted[1].totals}, sorted[0])
          });
};

module.exports = StateList;
