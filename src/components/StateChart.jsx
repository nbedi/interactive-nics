var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var StateChart = React.createClass({
  componentDidMount: function() {
    renderChart(this.props.data);
  },
  render: function() {
    return (<div id="chart"></div>)
  }
})

renderChart = function(data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
      
  var parseDate = d3.time.format("%Y-%m").parse;
      
  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);
      
  x.domain(d3.extent(data, function(d) { return parseDate(d.month); }));
  y.domain(d3.extent(data, function(d) { return d.totals; }));

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat(d3.format("s"))
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(parseDate(d.month)); })
      .y(function(d) { return y(d.totals); });
      
  var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Totals");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
}

module.exports = StateChart;
