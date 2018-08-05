(function() {

d3.bullet = function() {

  var orient = "left", // FIXME: needs in-line comment
      reverse = false,  // set the bullet order (left > right) for 'x1', DRY for the d3 linear scale
      duration = 3000,  // set how long the bars take to transition into position upon initial load

        // data bind which drives => size of the three outer rects in each bullet (i.e. green/yellow/red)
      ranges = bulletRanges,  // assigns variable to 'bulletRanges()' => this iterates through the JSON data object returning the values of the 'ranges' key

        // data bind which drives => size of the two inner rects in each bullet (i.e. slider value/empty portion of slider)
      markers = bulletMarkers,  // same as 'ranges', but for 'bulletMarkers()' returning the values to the 'marker' key

        // data bind which drives => the perpendicular vertical bar on the slider
      measures = bulletMeasures,  // also same as 'ranges', but for 'bulletMeasures()' returning the values to the 'measures' key

      width = 380, // FIXME: needs in-line comment
      height = 30,  // FIXME: needs in-line comment
      tickFormat = d3.format(",.1f");   // set number of decimal points shown in ticks rendered

  // For each small multiple…
  function bullet(g) {     // create accessor function for chart's <SVG><G> elements
    g.each(function(d, i) {  // create iterator function to access each <SVG><G> element in chart
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),  // invoke bulletRanges() => returns ranges array, create new rangez array with array elements rearranged by sorted in decending order
          markerz = markers.call(this, d, i).slice().sort(d3.descending),   // same as rangez but for the markers key
          measurez = measures.call(this, d, i).slice().sort(d3.descending),  // same as rangez but for the measures key
          g = d3.select(this);   // set d3 accessor function to variable for DRY purposes

      // Compute the new x-scale.
      var x1 = d3.scaleLinear()     // set d3 scaleLinear function to variable for DRY purposes
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])   // set x-axis domain JSON data (3 outer rects, 2 inner rects, vertical bar)
          .range(reverse ? [width, 0] : [0, width]);   // set x-axis range to render either (true: right > left) or false (left > right)

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scaleLinear()  // set old scale to variable for DRY purposes. If none exist, set d3 scale placeholder
          .domain([0, Infinity])    // set x-axis domain to all positive numbers
          .range(x1.range());   // set x-axis range to match x1 left-right range orientation

      // Stash the new scale.
      this.__chart__ = x1;   // select the current chart attached to the global root DOM and set to x1 scale function

      // Derive width-scales from the x-scales => width = xEnd - xStart
      var w0 = bulletWidth(x0),   // set to bulletWidth(), returns each bullet <G> with the xStart coordinate
          w1 = bulletWidth(x1);   // set to bulletWidth(), returns each bullet <G> with the xEnd coordinate

      // Update the range rects.
      var range = g.selectAll("rect.range")  // select all classed 'range.rect' => g = d3.select.this
          .data(rangez);   // select the data from the range array (3 outer rects) to update the bullets <G> elements

          // add additional rects if number of instantiated <svg><g><rect> is less than  data.length
      range.enter().append("rect")   // bind the data from the range array (3 outer rects) to the selected <G>
          .attr("class", function(d, i) { return "range s" + i; })   // iterate through 'rangez' array, assigning a unique class (aka the key name) to each (e.g. 'range s1', 'range s2', etc)
          .attr("width", w0)   // set the pre-transition width to 0 (so starts not visible)
          .attr("height", height)   // set the fixed height for each outer rect
          .attr("x", reverse ? x0 : 0)    // set the xEnd for each <G> before transition animation begins
        .transition()    // set a transition to add animation effect on initial load
          .duration(duration)     // set the animation transition speed (in milliseconds_)
          .attr("width", w1)    // set the xEnd to be used after load animation completes
          .attr("x", reverse ? x1 : 0);   // match the left-right orientation of the x1 scale

          // run transition animation on all bullet <RECT>  (both old and newly created)
      range.transition()      // invoke transition animation on rects when triggered by browser event
          .duration(duration)    // set the length of the animation (in milliseconds)
          .attr("x", reverse ? x1 : 0)    // match the left-right orientation of the x1 scale
          .attr("width", w1)        // set the xEnd to be used after load animation completes
          .attr("height", height);       // set the fixed height for each bullet

      // Update the measure rects.
      var measure = g.selectAll("rect.measure")       // same as 'range', but for inner rects unless otherwise commented
          .data(measurez);

      measure.enter().append("rect")       // same as 'range', but for inner rects unless otherwise commented
          .attr("class", function(d, i) { return "measure s" + i; })
          .attr("width", w0)
          .attr("height", height / 3)     // set the fixed height for each inner rect (1/3 of outer rect height)
          .attr("x", reverse ? x0 : 0)
          .attr("y", height / 3)    // set the fixed height for each inner rect (1/3 of outer rect height)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", reverse ? x1 : 0);

      measure.transition()        // same as 'range', but for inner rects unless otherwise commented
          .duration(duration)
          .attr("width", w1)
          .attr("height", height / 3)    // set the fixed height for each inner rect (1/3 of outer rect height)    FIXME: chart not responding to value changes
          .attr("x", reverse ? x1 : 0)
          .attr("y", height / 3);    // set the fixed height for each inner rect (1/3 of outer rect height)

      // Update the marker lines.
      var marker = g.selectAll("line.marker")   // same as 'range', but for vertical line unless otherwise commented
          .data(markerz);

      marker.enter().append("line")      // same as 'range', but for vertical line unless otherwise commented
          .attr("class", "marker")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", height / 6)   // set the fixed yBottom for each vertical line (1/6 of outer rect height)    FIXME: chart not responding to value changes
          .attr("y2", height * 5 / 6)   // set the fixed yTop for each vertical line (1/6 of outer rect height)
        .transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1);

      marker.transition()      // same as 'range', but for vertical line unless otherwise commented
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", height / 6)    // set the fixed yBottom for each vertical line (1/6 of outer rect height  TODO: yet to confirm, via responsive testing
          .attr("y2", height * 5 / 6);      // set the fixed yTop for each vertical line (1/6 of outer rect height)

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update the tick groups.
      var tick = g.selectAll("g.tick")
          .data(x1.ticks(8), function(d) {
            return this.textContent || format(d);
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append("g")
          .attr("class", "tick")
          .attr("transform", bulletTranslate(x0))
          .style("opacity", 1e-6);

      tickEnter.append("line")
          .attr("y1", height)
          .attr("y2", height * 7 / 6);

      tickEnter.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .attr("y", height * 7 / 6)
          .text(format);

      // Transition the entering ticks to the new scale, x1.
      tickEnter.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = tick.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      tickUpdate.select("line")
          .attr("y1", height)
          .attr("y2", height * 7 / 6);

      tickUpdate.select("text")
          .attr("y", height * 7 / 6);

      // Transition the exiting ticks to the new scale, x1.
      tick.exit().transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  // left, right, top, bottom
  bullet.orient = function(x) {   // create an 'orient' property generator function to set whether bullet renders left>right or right>left
    if (!arguments.length) return orient;   // if x=null just declare an 'orient' key but without any assigned value
    orient = x;    // assign the 'orient' variable to whatever arg is passed into the function
    reverse = orient == "right" || orient == "bottom";     // if the x = 'right' || 'bottom', set reverse to 'true' aka right>left orientation for bullet chart rendered
    return bullet;      // return the newly labeled bullet
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

  return bullet;
};

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletTranslate(x) {
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}

function bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}

})();

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
