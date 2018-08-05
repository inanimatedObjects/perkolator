
var w = 300;
var h = 300;

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// var color = d3.scaleOrdinal(d3.schemeCategory10);
// var colors = d3.scaleOrdinal(d3.schemeCategory10);


  // data structured as an array of objects, with each row representing a fundamental comp type
let offerTerms = [
	{ oneTime: 5, rateBased: 10, eventBased: 22 },    // cash compensation => cash payments
	{ oneTime: 4, rateBased: 12, eventBased: 28 },     // in kind compensation => benefits
	{ oneTime: 7, rateBased: 23, eventBased: 35 },       // in kind compensation => equity
	{ oneTime: 23, rateBased: 17, eventBased: 43 }       // time obligation to employer
];

  // offerTerms is organized by columns. Stack layout reconfigures the data to be organized by categories
      //Set up stack method to capture total remuneration from all comp form.

  // stack data
let compStack = d3.stack()
      .keys([ "inCash", "inKind", "forTime" ]);

// data, stacked
let compSeries = compStack(offerTerms);
console.log(compSeries);
console.table(compSeries);




// console.log("rate: ", offerTerms.get("rateBased"))
// console.log("inKind: ", offerTerms.get("inKind"))
// console.log(paymentInterval.get("rateBased"))
// console.log(paymentInterval.set("rateBased", 120000))
// console.log(paymentInterval.get("rateBased"))
// console.log(d3.keys(compSeries));


// console.log("compSeries values: ", d3.values(compSeries));
// console.log("offerTerms values: ", d3.values(offerTerms));
// console.table("compSeries values table: ", d3.values(compSeries));
//
// console.log("compSeries entries: ", d3.entries(compSeries));
// console.log("offerTerms entries: ", d3.entries(offerTerms));
// console.table("offerTerms entries table: ", d3.entries(offerTerms));




// // Add a group for each row of data
// var groups = svg.selectAll("g")
//     .data(compSeries)
//     .enter()
//     .append("g")
//     .style("fill", function(d, i) {
//         return colors(i);
//     });
//
// // Add a rect for each data value
// var rects = groups.selectAll("rect")
//     .data(function(d) { return d; })
//     .enter()
//     .append("rect")
//     .attr("x", function(d, i) {
//         return xScale(i);
//     })
//     .attr("y", function(d) {
//         return yScale(d[0]);   // baseline stack value
//     })
//     .attr("height", function(d) {
//         return yScale(d[1]) - yScale(d[0]);      // topline stack value
//     })
//     .attr("width", xScale.bandwidth())
//
// .data(function(d) { return d; });


//
// let paymentIntervals = d3.map( [
//   {"intervalType": "oneTime"},
//   {"intervalType": "rateBased"},
//   {"intervalType": "eventBased"}
// ],
//   function(d) {
//     return d.intervalType;
//   }
// );
// console.log(paymentIntervals.get("rateBased"));


// assign the discrete payment interval types
// var intervalTypes = d3.stack()
//               .keys([ "oneTime", "rateBased", "eventBased" ]);
//
// var intervalSeries = d3.stack(intervalTypes)
//   console.log("intervals: ",intervalTypes.get("oneTime"))
//


              // // declare and load data
              // // load data
              // let offerSheet = [
              //   { inCash: 5, inKind: 10, forTime: 22 },
              //   { inCash: 4, inKind: 12, forTime: 28 },
              //   { inCash: 7, inKind: 23, forTime: 35 },
              //   { inCash: 23, inKind: 17, forTime: 43 }
              // ];
              //
              //   //Data, stacked
              //
              //   var series = d3.stack(offerSheet)
              // // console.log("series: ", series)
              // // console.table(series.keys)
              //
              //   // to assign the payment intervalTypes to the top-level remunerationTypes:
              //   var paymentInterval = d3.map()
              //   .set("nonRecurring", 8000)
              //   .set("rateBased", 100000)
              //   .set("eventBased", 15000);
              //
              //   console.log(paymentInterval.get("rateBased"))
              //   console.log(paymentInterval.set("rateBased", 120000))
              //   console.log(paymentInterval.get("rateBased"))
              //
              //   var compFormSeries = d3.stack(offerSheet)
              //       // console.log("compForm: ", d3.keys(compFormSeries))
              //   //
              //   // console.table(d3.keys(compFormSeries));
              //   // console.table(d3.values(compFormSeries));
              //   // console.table(d3.entries(compFormSeries));
              //
              // console.log("paymentInterval : ", paymentInterval.get("eventBased") );

// instantiated as a variable, looks like this:
//   let remunerationForms = d3.map( [
//     {compType: "inCash"},
//     {compType: "inKind"},
//     {compType: "forWork"}
//   ],
//     function(d) {
//       return d.compType;
//     }
//   );
//






// wages and salaries in cash
// wages and salaries in kind
// supplements to wages and salaries
// wages and salaries: in cash




// var map =  d3.map().set("fruit", "mango");

// var mapComp = d3.map()
//     .set("c1", 5000)
//     .set("c2", 100000)
//     .set("c3", 10000);
//
// console.log(mapComp.get("c1"));
// console.log(mapComp.set("c1", 3000));
//
//


// console.log(considerationTypes.get("time"));
// console.log(considerationTypes.values("time"));




// var month = {"jan": 1, "Feb": 2, "mar": 3, "apr": 4};
// console.log(d3.keys(month));
// console.log(d3.values(month));
// console.log(d3.entries(month));

// var fruits =  d3.set().add("mango")
//     .add("apple").add("orange");
//    console.log(fruits.has("forTime")); // return false.
//    console.log(fruits.remove("apple")); //true
//    console.log(fruits.size());    // size is 2
//    console.log(fruits.empty());

   // var exmpledata = [
   //    {   "color" : "red",
   //        "key" : 1
   //      },
   //    { "color" : "green", "key" : 2},
   //    { "color" : "blue", "key" : 75 }
   // ]

   // var nest =  d3.nest()
   //    .key(function (d) { return d.color; })
   //    .entries(data)console.log(nest);
   // var filter = nest.filter(function (d) { return d.key = = = 'red' })
   // console.log(filter);



// console.log(d3.keys(data));
// console.log(d3.values(data));
// console.log(d3.entries(data));


const renderSummaryPanel = (data) => {
  let width = 1200,
    height = 200,
    summaryData = [
      [ "Cash", (data[0].value + data[1].value + data[2].value) ],
      [ "Equity", (data[3].value + data[4].value + data[5].value) ],
      [ "Perks", (data[6].value + data[7].value + data[8].value) ],
      [ "Time", (- data[9].value + data[10].value + data[11].value) ]
    ],
    svg = d3.select('#summaryPanel').append('svg')
      .attr('width', width)
      .attr('height', height);

  let summaryText = summaryData.forEach((d, i) => {
    svg.append('g')
      .append('text')
      .attr('class', d[0] + ' summary')
      .attr('text-anchor', 'middle')
      .text(d[0] + " : " + d[1])
      .attr('x', (((width / 4) * i) + 100))
      .attr('y', 100)
  })

  d3.selectAll('input[type=range]').on('input', function() {
    console.log(this)
  })

}
