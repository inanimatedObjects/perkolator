function slider(data)
{
  let margin = {top: 100, left: 15},
    width  = 280,
    height = 150,
    axisWidth = width - 2 * margin,
    handle, slider, line;

  let x = d3.scaleLinear()
    .domain([0, 1])
    .range ([0, width])
    .clamp(true);

var scale = d3.scaleLinear()
        .domain([0, 1]).range([0, axisWidth]);

var axis = d3.axisBottom()
        .scale(scale)
        .ticks(10)
        .tickSize(12)
        .tickPadding(10)
        .tickFormat(d3.format(".0%"));

   // var xAxis = d3.svg.axis()
   //      .scale(axisScale);


  function drawSlider(svg) {

    slider = svg.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(37.5, 25)")
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height)
      // ^ needs adjustment

    let id = svg.attr("id");

    line = slider.append("line")
      .attr("class", "slideLine")
      .attr("x1", x.range()[0])
    	.attr("x2", x.range()[1])
    	.attr("y1", height / 2)
    	.attr("y2", height / 2)
        .call(axis);

    slider.append("circle")
    	.attr("class", "handle" + id)
    	.attr("cy", height / 2)
    	.attr("r", 13)
      .call(d3.drag()
      	.on("start drag", function() { handleSlide(x.invert(d3.event.x), id, this.totalComp) }))

    function handleSlide(d, id) {
        let startVal = offerArr[id]

        d3.select(".handle" + id)
            .attr("cx", x(d));

        d3.select(".val" + id)
            .text(Math.round(data[id].min + (d * (data[id].max - data[id].min))))

        let endVal = Number(d3.select(".val" + id).text());

        totalComp = totalComp - startVal + endVal;

        offerArr[id] = endVal

        d3.select(".summaryValue")
            .text(Math.round(totalComp, 0))

    }
  }
  return drawSlider;
}
