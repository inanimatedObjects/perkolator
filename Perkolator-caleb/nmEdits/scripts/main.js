<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Flip it, Stack it </title>
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <script src="https://d3js.org/d3-color.v1.min.js"></script>
	<script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
	<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
  <script src="https://d3js.org/d3-collection.v1.min.js"></script>
	<style type="text/css">



		body {
      margin:0;
      position:fixed;
      top:0;
      right:0;
      bottom:0;
      left:0;
			background-color: gray;
		}

		svg {
			background-color: white;
		}



	</style>
</head>
<body>
  <h1>Flip it up, Stack it down</h1>
	<script type="text/javascript">



		//Width and height
		var w = 500;
		var h = 300;

		//Original data
		var dataset = [
			[
				{ x: 0, y: 5 },
				{ x: 1, y: 4 },
				{ x: 2, y: 2 },
				{ x: 3, y: 7 },
				{ x: 4, y: 23 }
			],
			[
				{ x: 0, y: 10 },
				{ x: 1, y: 12 },
				{ x: 2, y: 19 },
				{ x: 3, y: 23 },
				{ x: 4, y: 17 }
			],
			[
				{ x: 0, y: 22 },
				{ x: 1, y: 28 },
				{ x: 2, y: 32 },
				{ x: 3, y: 35 },
				{ x: 4, y: 43 }
			]
		];

		//Set up stack method
		var stack = d3.layout.stack()
						.order("reverse");  //Flip the order

		//Data, stacked
		stack(dataset);

		//Set up scales
		var xScale = d3.scale.ordinal()
			.domain(d3.range(dataset[0].length))
			.rangeRoundBands([0, w], 0.05);

		var yScale = d3.scale.linear()
			.domain([0,
				d3.max(dataset, function(d) {
					return d3.max(d, function(d) {
						return d.y0 + d.y;
					});
				})
			])
			.range([0, h]);

		//Easy colors accessible via a 10-step ordinal scale
		var colors = d3.scale.category10();

		//Create SVG element
		var svg = d3.select("body")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		// Add a group for each row of data
		var groups = svg.selectAll("g")
			.data(dataset)
			.enter()
			.append("g")
			.style("fill", function(d, i) {
				return colors(i);
			});

		// Add a rect for each data value
		var rects = groups.selectAll("rect")
			.data(function(d) { return d; })
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("width", xScale.rangeBand())
			.attr("y", function(d) {
				return h - yScale(d.y0) - yScale(d.y);  //Flip the math!
			})
			.attr("height", function(d) {
				return yScale(d.y);
			});



	</script>
</body>
