

var fieldset = d3.select("#panel").select("fieldset");
//
// // function toggle() {
// //    if (!fieldset.property("disabled")) {
// //      return fieldset.property("disabled", function(){return true;})
// //      .style("background-color", "#e9967a");
// //    } else {
// //      return fieldset.property("disabled", function(){return false;})
// //      .style("background-color", "#add8e6");
// //    }
// // }
//
// function randomize(d) {
//   if (!d.randomizer) d.randomizer = randomizer(d);
//   d.ranges = d.ranges.map(d.randomizer);
//   d.markers = d.markers.map(d.randomizer);
//   d.measures = d.measures.map(d.randomizer);
//   return d;
// }
//
// function randomizer(d) {
//   var k = d3.max(d.ranges) * .2;
//   return function(d) {
//     return Math.max(0, d + k * (Math.random() - .5));
//   };
// }



// ***********animated watermark****************

// import {path, angles} from './timer.js';
// var timer = require('./timer.js')

var svg = d3.select("#perkolator"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    angles = d3.range(0, 2 * Math.PI, Math.PI / 200);

svg.attr("transform", "translate(" + 100 + "," + 100 + ")")

svg.append("text")
  .attr("transform", "translate(" + 70 + "," + 150 + ")")
  .style("font-size", "70px")
  .text("inanimate   (d)");

svg.append("text")
  .attr("transform", "translate(" + 610 + "," + 190 + ")")
  .style("font-size", "99px")
  .text("bjects");

var path = svg.append("g")
    .attr("transform", "translate(" + 520 + "," + 130 + ")")
    .attr("fill", "none")
    .attr("stroke-width",7)
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
            var t = d3.now() / 1500;
            return 80 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 10;
          });
    });

// timer(path, angles);

d3.timer(function() {
  path.attr("d", function(d) {
    return d(angles);
  });
});
