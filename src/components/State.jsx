var React = require('react');
var _ = require('underscore');

var StateChart = require('./StateChart.jsx');

var State = React.createClass({
  render: function() {
    var state = _.chain(this.props.data)
                      .sortBy('month')
                      .reverse()
                      .map(function(m) {
                        var columns = _.map(m, function(value, key){
                                          return (
                                              <td>{isNaN(value)||!value?value:value.toLocaleString()}</td>
                                              );
                                        });
                        return (<tr key={m.month}>{columns}</tr>);
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
        <StateChart data={this.props.data} />
        <div className="switch">
            <label>
              <input id="default" name="switch" type="radio" defaultChecked={true} />
              Default
            </label>

            <label htmlFor="prepawn" onclick="">
              <input id="prepawn" name="switch" type="radio" />
              Prepawn
            </label>

            <label htmlFor="redemption" onclick="">
              <input id="redemption" name="switch" type="radio" />
              Redemption
            </label>
          
            <label htmlFor="returned" onclick="">
              <input id="returned" name="switch" type="radio" />
              Returned
            </label>
          
            <label htmlFor="rentals" onclick="">
              <input id="rentals" name="switch" type="radio" />
              Rentals
            </label>
          
            <label htmlFor="private_sale" onclick="">
              <input id="private_sale" name="switch" type="radio" />
              Private sale
            </label>
            
            <label htmlFor="return_to_seller" onclick="">
              <input id="return_to_seller" name="switch" type="radio" />
              Returned (private seller)
            </label>
        </div>
        <table>
          <thead><tr id="stateHeaders">{stateHeaders}</tr></thead>
          <tbody>{state}</tbody>
        </table>
      </div>
    );
  }
});

module.exports = State;
