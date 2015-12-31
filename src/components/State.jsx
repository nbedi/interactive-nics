var React = require('react');
var _ = require('underscore');

var StateChart = require('./StateChart.jsx');

var State = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
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
    
    var state = _.map(this.state.data, function(m) {
                          return (
                            <tr id={m.month} key={m.month}>
                              <td id="month" className="small">{m.month}</td>
                              <td id="permit" className="small">{m.permit.toLocaleString()}</td>
                              <td id="handgun" className="medium">{m[switchValue+'handgun']?m[switchValue+'handgun'].toLocaleString():0}</td>
                              <td id="long_gun" className="medium">{m[switchValue+'long_gun']?m[switchValue+'long_gun'].toLocaleString():0}</td>
                              <td id="other" className="medium">{m[switchValue+'other']?m[switchValue+'other'].toLocaleString():0}</td>
                              <td id="multiple" className="large">{m.multiple.toLocaleString()}</td>
                              <td id="admin" className="large">{m.admin.toLocaleString()}</td>
                              <td id="totals" className="small">{m.totals.toLocaleString()}</td>
                            </tr>
                          );
                      });
    return (
      <div className="state">
        <a href="#/">Back</a>
        <h1>{this.state.data[0].state}</h1>
        <StateChart data={this.state.data} />
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
              <th id="month" className="asc small sorted" onClick={this.sort}>Month</th>
              <th id="permit" className="desc small" onClick={this.sort}>Permits</th>
              <th id="handgun" className="desc medium" onClick={this.sort}>Handgun</th>
              <th id="long_gun" className="desc medium" onClick={this.sort}>Long guns</th>
              <th id="other" className="desc medium" onClick={this.sort}>Other</th>
              <th id="multiple" className="desc large" onClick={this.sort}>Multiple</th>
              <th id="admin" className="desc large" onClick={this.sort}>Admin</th>
              <th id="totals" className="desc small" onClick={this.sort}>Totals</th>
            </tr>          
          </thead>
          <tbody>{state}</tbody>
        </table>
      </div>
    );
  }
});

module.exports = State;
