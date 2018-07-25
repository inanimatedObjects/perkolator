// data normalizer fn
function normalize(array) {
  var mapped = array.map(x => (900 / accumXScale[12]) * x);
  return mapped;
};

var renderStackedBar = (data) => {
  var accumXScale = [0];
  data.reduce((a, b, i) => {
    return accumXScale[i + 1] = a + b;
  }, 0);

  var normalizedXScale = normalize(accumXScale);
  var normalizedData = normalize(data);

  var chartX = 900;
  var chartY = 200;
  var xSum = d3.sum(normalizedData);

  var bars = d3.select("#stackedBar")
      .append("svg")
      .attr("class", "bar")
      .style("width", chartX)
      .style("height", chartY)

    bars.append("rect")
      .attr("class", "stackedBarBackground")
      .attr("x", 0)
      .attr("y", 50)
      .attr("width", 900)
      .attr("height", 100)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)

    bars.selectAll("g")
      .data(data)
      .enter().append("g")
        .append("rect")
          .attr("class", "barSegment")
          .attr("x", (d, i) => { return normalizedXScale[i] + (chartX - xSum) / 2 })
          .attr("y", 50)
          .attr("width", (d, i) => { return normalizedData[i] })
          .attr("height", 100)
          .attr("fill", (d, i) => { return colorScale(i) })
          .attr("stroke", "lightblue")
          .attr("stroke-width", 1)
          .on("mouseover", function() { tooltip.style("display", null); })
          .on("mouseout", function() { tooltip.style("display", "none"); })
          .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(document.querySelector(".output." + cardName).value);
          });

    var tooltip = bars.append("g")
      .attr("class", "tooltip")
      .style("display", "none")

    tooltip.append("rect")
      .attr("width", 30)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");


    bars.exit().remove();
}
