<!DOCTYPE html>
  <meta charset="utf-8">
  <style>
    body {
      background-color: gray;
    }
    .axis path, .axis--x line {
      display: none;
    }
    input {
      position: absolute;
      left: 10px;
      top: 15px;
      width:172px;
    }
  </style>
  <svg width="700" height="600"></svg>

<script src="//d3js.org/d3.v4.min.js"></script>
	<script src="https://d3js.org/d3-color.v1.min.js"></script>
	<script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
	<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<input type="range" min="0" max="100" step="25" value="0">

<script>
var svg = d3.select("svg"),
    margin = {top: 10, right: 400, bottom: 200, left: -34},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.2218917888)
      .align(0.868);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal(d3.schemePastel1)
//  		.range(["#EDC951","#CC333F","#00A0B0"]);

  var stack = d3.stack();

  d3.csv("data.csv", function(error, data) {
    if (error) throw error;

    var data_nest = d3.nest()
                      .key(function(d){
                          return d.Slider
                      })
                      .entries(data)

    var data = data_nest.filter(function(d){ return d.key == 0})[0].values;

    var cat = ["first","second","third"];

    x.domain(data.map(function(d) { return d.x; }));
    y.domain([0, 100]).nice();
    z.domain(cat);

    g.selectAll(".serie")
      .data(stack.keys(cat)(data))
      .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function(d) {return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.x); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .style("font", "18px sans-serif")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .attr("transform","translate(" + width + ",0)")
        .call(d3.axisRight(y).ticks(10, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks(10).pop()))
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("fill", "#000000");

    d3.select("input")
      .on("input", changed)
      .on("change", changed);

    function changed() {
      var value = this.value;

      g.selectAll(".serie")
        .data(stack.keys(cat)(data_nest.filter(function(d){return +d.key == value})[0].values))
        .selectAll("rect")
        .data(function(d) { return d; })
        .transition()
        .duration(1500)
        .delay(function(d,i){return i*500})
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("x", function(d) { return x(d.data.x); })
        .attr("y", function(d) { return y(d[1]); })
      });


</script>
