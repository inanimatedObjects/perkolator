// data normalizer fn
function normalize(array) {
  var mapped = array.map(x => (900 / accumXScale[12]) * x);
  return mapped;
};

const renderStackedBar = (data) => {
  let normalizedXScale = normalize(accumXScale);
  let normalizedData = normalize(dataArr);

  let chartX = 900;
  let chartY = 100;
  let xSum = d3.sum(normalizedData);

  let bars = d3.select("#stackedBar")
      .append("svg")
      .attr("class", "bar")
      .style("width", chartX)
      .style("height", chartY)

    bars.append("rect")
      .attr("class", "stackedBarBackground")
      .attr("x", 0)
      .attr("y", 50)
      .attr("width", chartX)
      .attr("height", chartY)
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
            let xPosition = d3.mouse(this)[0] - 15;
            let yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(this.value);
          });

    let tooltip = bars.append("g")
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
