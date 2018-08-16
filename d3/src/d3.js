var margin = {top: -15, right: 20, bottom: 38, left: 20},
    width = 400 - margin.left - margin.right,
    // NOTE: abstract out 400
    height = 40 - margin.top - margin.bottom,
    labelWidth = -10,
    labelHeight = -height - margin.top - margin.bottom + 10;

var chart = d3.bullet()
    .width(width)
    .height(height );

var offer = [
  {},
  {
    "title":"Signing Bonus",
    "subtitle":"US$, in thousands",
    "ranges":[5,8,15],
    "measures":[6,14],
    "markers":[9]},
  {
    "title":"Annual Base Salary",
    "subtitle":"US$, paid b-weekly",
    "ranges":[75,105,170],
    "measures":[90,168],
    "markers":[130]},
  {
    "title":"Annual Incentive Bonus",
    "subtitle":"$US, performance contingent",
    "ranges":[5,20,30],
    "measures":[10,29],
    "markers":[5, 11]}
];


var data1 = [
  {
    "title":"Cash Compensation",
    "subtitle":"US$, in thousands",
    "ranges":[70,155,200],
    "measures":[120,190],
    "markers":[150]},
  {
    "title":"Equity Compensation",
    "subtitle":"US$, present value",
    "ranges":[5,35,70],
    "measures":[30,68],
    "markers":[30]},

  {
    "title":"Benefits",
    "subtitle":"$US, fair market value",
    "ranges":[5,20,30],
    "measures":[10,29],
    "markers":[5, 11]},
  {
    "title":"Comp Ratio",
    "subtitle":"%, cash/equity",
    "ranges":[15,50,103],
    "measures":[71,100],
    "markers":[80]},
  {
    "title":"Overall Offer Value",
    "subtitle":"US$, FMV of all comp forms",
    "ranges":[80,210,300],
    "measures":[170,287],
    "markers":[200]}
];

data1[0].markers = [150,180];
data1[1].markers = [30,42];
data1[2].markers = [16,18];
data1[3].markers = [50, 51];
data1[4].markers = [12,18];


// offer[0].markers = [6,9];
// offer[0].markers = [60,140];
// offer[1].markers = [130,168];
// offer[2].markers = [10,29];


function render(data) {

  // d3.json("bullets.json", function(error, data) {
  //   if (error) throw error;

  var svg = d3.select("#thirdPanel").selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bulletContainer")
      .attr("width", width + margin.left + margin.right )
      .attr("height", "20px")
    .append("g")
      .attr("class", "bullet")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart);

  var title = svg.append("g")
      .style("text-anchor", "start")
      .attr("transform", "translate(" + labelWidth +", " + labelHeight + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1.5em")
      .text(function(d) { return d.subtitle; });

  title.append("text")
      .attr("class", "term")
      .attr("dy", "0.4em")
      .attr("dx", width/2)
      .text(function(d) {
        if (d.title !== "Comp Ratio") {
          return "$" + d.markers[0] + "k";
        } else {
          return d.markers[0] + "%"; }
        });

  let div = d3.select('#dragDiv')
    .call(d3.drag()
    .on('start.interrupt', function () {
    div.interrupt();
    console.log('stop')
    })
    .on('start drag', function () {
    console.log('drag')
      div.style('top', d3.event.y + 150 + 'px')
      div.style('left', d3.event.x - 180 + 'px')
  } ));

  d3.selectAll("button").on("click", function() {
    svg.datum(randomize).call(chart.duration(1000));
  });
};


// implement drag event lister


// var fieldset = d3.select("#panel").select("fieldset");
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
render(offer);













// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//
//     svg.height = 300;
//     svg.width = 100;
//
// var panel = svg.append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
//     .attr("fill", "lightgrey")
//     .attr("stroke-width", 15)
//     .attr("stroke-linejoin", "round")
//     .style("opacity", 0.8)
//     .text("Panel");
  // .selectAll("panel")
  //   .data(["summaryPanel", "stackedBarPanel", "sliderPanel", "analyticsPanel"])
  //   .enter().append("panel").append("text")
  //   .text("Panel");
//
// svg.selectAll(".panel").append("g").append("text")
//   .attr("class", "panel")
//   .attr("transform", "translate(10, 20)")
//   .text("summaryPanel");















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
    .attr("stroke-width",10)
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
            var t = d3.now() / 3000;
            return 80 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 16;
          });
    });

// timer(path, angles);

d3.timer(function() {
  path.attr("d", function(d) {
    return d(angles);
  });
});
