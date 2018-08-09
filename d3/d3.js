
// var svg = d3.select("#summaryPanel"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//
// svg.append("g").append("text")
//   .attr("class", "panel-Id")
//   .attr("transform", "translate(10, 20)")
//   .text("summaryPanel");
//
// svg.height = 20;
// svg.width = 100;


// var svg = d3.select("#perkolator"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height"),
//     angles = d3.range(0, 2 * Math.PI, Math.PI / 200);
//
// svg.attr("transform", "translate(" + 0 + "," + -650 + ")");
//
// var path = svg.append("g")
//     .attr("transform", "translate(" + width / 2 + 380 + "," + height / 2 + 50 + ")")
//     .attr("fill", "none")
//     .attr("stroke-width", 15)
//     .attr("stroke-linejoin", "round")
//     .style("opacity", 0.3)
//   .selectAll("path")
//   .data(["cyan", "magenta", "yellow"])
//   .enter().append("path")
//     .attr("stroke", function(d) { return d; })
//     .style("mix-blend-mode", "darken")
//     .datum(function(d, i) {
//       return d3.radialLine()
//           .curve(d3.curveLinearClosed)
//           .angle(function(a) { return a; })
//           .radius(function(a) {
//             var t = d3.now() / 3000;
//             return 700 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
//           });
//     });
//
// d3.timer(function() {
//   path.attr("d", function(d) {
//     return d(angles);
//   });
// });




var svg = d3.select("#perkolator"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    angles = d3.range(0, 2 * Math.PI, Math.PI / 200);

svg.attr("transform", "translate(" + -110 + "," + -130 + ")")
  .attr("opacity", 1.0);

var path = svg.append("g")
    .attr("transform", "translate(" + width / 2 + 300 +"," + height / 2 + 300 + ")")
    .attr("fill", "none")
    .attr("stroke-width", 15)
    .attr("stroke-linejoin", "round")
  .selectAll("path")
  .data(["cyan", "magenta", "yellow"])
  .enter().append("path")
    .attr("stroke", function(d) { return d; })
    .style("mix-blend-mode", "darken")
    .datum(function(d, i) {
      return d3.radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function(a) { return a; })
          .radius(function(a) {
            var t = d3.now() / 1000;
            return 250 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
          });
    });

d3.timer(function() {
  path.attr("d", function(d) {
    return d(angles);
  });
});
