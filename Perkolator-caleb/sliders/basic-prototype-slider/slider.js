function slider()
{
    var margin = {top: 5, left: 10, right: 10, bottom: 5},
        width  = 300 - margin.left - margin.right,
        height = 40  - margin.top  - margin.bottom,
        handle, slider

    var x = d3.scaleLinear()
        .domain([0, 1])
        .range ([0, width])
        .clamp(true);

    function chart(el)
    {
        var svg = el.attr("width",  width  + margin.left + margin.right)
            .attr("height", height + margin.top  + margin.bottom)

        slider = svg.append("g")
            .attr("class","slider")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

        line = slider.append("line")
          .attr("class", "slideLine")
          .attr("x1", x.range()[0])
        	.attr("x2", x.range()[1])
        	.attr("y1", height / 2)
        	.attr("y2", height / 2)

        slider.append("circle")
        	.attr("class", "handle " + el.attr("id"))
        	.attr("cx", x.range()[1] / 2)
        	.attr("cy", height / 2)
        	.attr("r", 9)
          .call(d3.drag()
          	.on("start drag", function() {
              handleSlide(x.invert(d3.event.x), el)
            } ))

        function handleSlide(d, el) {
          console.log(d)
          d3.select(".handle")
            .attr("cx", x(d))
        }
    }

    return chart;
}
