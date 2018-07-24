// ******** GLOBAL : HELPERS ***********

// External Scripts
let d3 = require('d3');

// Initialize App Container/Viewport
var height = 500,
    width = 500,
    margin = 25,
    offset = 50,
    axisWidth = width - 2 * margin,
    svg;

function createSvg(){
     svg = d3.select("body").append("svg")
      .classed("inanimatedObject", true)
      .attr("id",  "perkolator")
      .attr("width", width)
      .attr("height", height);
}


// Database Operators




// SCALES AND INTERPOLATORS
export const color = d3.scale.ordinal().range([
  '#EF3B39', '#FFCD05', '#69C9CA', '#666699', '#CC3366','#0099CC', '#999999', '#FBF5A2','#6FE4D0', '#CCCB31', '#009966', '#C1272D', '#F79420', '#445CA9','#402312', '#272361', '#A67C52', '#016735', '#F1AAAF','#A0E6DA', '#C9A8E2', '#F190AC', '#7BD2EA','#DBD6B6'
]);
export const categoricalColorScales = [
  { "name" : "schemeAccent", "n": 8},
  { "name" : "schemeDark2", "n": 8},
  { "name" : "schemePastel2", "n": 8},
  { "name" : "schemeSet2", "n": 8},
  { "name" : "schemeSet1", "n": 9},
  { "name" : "schemePastel1", "n": 9},
  { "name" : "schemeCategory10", "n" : 10},
  { "name" : "schemeSet3", "n" : 12 },
  { "name" : "schemePaired", "n": 12},
  { "name" : "schemeCategory20", "n" : 20 },
  { "name" : "schemeCategory20b", "n" : 20},
  { "name" : "schemeCategory20c", "n" : 20 }
];
export const colorScale = d3.scaleOrdinal(d3[categoricalColorScales[0].name])
// export let n = categoricalColorScales[0].n,
// unit = containerWid/n;
