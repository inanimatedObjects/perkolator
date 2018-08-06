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
          .attr("y2", height * 5 / 6)   // set the fixed yTop for each vertical line (5/6 of outer rect height)
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
      var format = tickFormat || x1.tickFormat(8);  // if tickFormat exits (set to # of decimal points to display), return tickFormat. Otherise iterate through the tick array, assigining an x value to each tick on the axis

      // Update the tick groups.
      var tick = g.selectAll("g.tick")    // DRY variable for accessor function for <G>
          .data(x1.ticks(6), function(d) {   // set the number of ticks on the x-axis to bind to each g.tick, iterated through tick array,
            return this.textContent || format(d);   // apply tick label text  TODO: confirm var format
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append("g")   // add any <g> necessary to match tick array elements
          .attr("class", "tick")  // tag the new <g> elements as 'ticks'
          .attr("transform", bulletTranslate(x0))  // iterate though tick array and set distance on x-axis between each tick
          .style("opacity", 1e-6);   // set all attached (both line and text) to semi-transparent as not to distract

      tickEnter.append("line")  //  create the vertical tick bar
          .attr("y1", height)  // set yBottom coordinate of vertical tick line  TODO: confirm
          .attr("y2", height * 7 / 6);  // set yTop coordinate of vertical tick line

      tickEnter.append("text")   // create and attache the text to each tick
          .attr("text-anchor", "middle")   // center the tick text so that the midpoint is in line with the vertical line
          .attr("dy", "1em")    //  set the vertical distance beneath the tick to render the tick text
          .attr("y", height * 7 / 6)    // FIXME: same as dy
          .text(format);  // 'format' arg returns x origin coordinate for each tick and sets the number of decimals to display via tickFormat (set to d3.format helper function)

      // Transition the entering ticks to the new scale, x1.
      tickEnter.transition()    // set the parameters of the transition animation to the text anchor and ticks in the newly entered <g> elements
          .duration(duration)    // set the time of transition
          .attr("transform", bulletTranslate(x1))  // set the tick/text-anchored to the xScale rendered
          .style("opacity", 1);   // set the transparency of the tick/text-anchored

      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = tick.transition()    // set the transition animation parameters for all existing tick/text-anchored
          .duration(duration)  // st the time of the transition
          .attr("transform", bulletTranslate(x1))  // set the tick/text-anchored to the xScale rendered
          .style("opacity", 1);   // set the transparency of the tick/text-anchored to fully visible

      tickUpdate.select("line")     // set the vertical line of each tick
          .attr("y1", height)    // set yStart
          .attr("y2", height * 7 / 6);    // set yEnd

      tickUpdate.select("text")
          .attr("y", height * 7 / 6);    // set yOrigin for tick text (aka distance below each vertical line to render text)

      // Transition the exiting ticks to the new scale, x1.
      tick.exit().transition()      // to maintain a smooth visual, keep old texts after new created, removing from DOM only after transition complete
          .duration(duration)    // set transition time (to match rest of bullet elements)
          .attr("transform", bulletTranslate(x1))     // set the tick/text-anchored to the xScale rendered
          .style("opacity", 1e-6)   // set the transparency of the tick/text-anchored to effectively invisible  (since interpolator can't take 'null' as an argument)
          .remove();    // remove unneeded tick elements from the DOM
    });

    // queue for managing animations. Guarantees consistent, synchronized timing with concurrent or staged animations
    d3.timer.flush();   // invoking flush at the end of the event loop allows any zero-delay timers immediately without causing flash (~17ms between frames causes typically unwanted flash effect)
  }

  // left, right, top, bottom
  bullet.orient = function(x) {   // create an 'orient' property generator function to set whether bullet renders left>right or right>left
    if (!arguments.length) return orient;   // if x=null just declare an 'orient' key but without any assigned value
    orient = x;    // assign the 'orient' variable to whatever arg is passed into the function
    reverse = orient == "right" || orient == "bottom";     // if the x = 'right' || 'bottom', set reverse to 'true' aka right>left orientation for bullet chart rendered
    return bullet;      // return the newly labeled bullet
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) { // set 'bullet' key to an accessor function in order to access the ranges array (each element has a 3 sub-element array (i.e. data driving the green/yellow/red background rects))
    if (!arguments.length) return ranges;    // if no argument is passed in, return existing ranges or emplty array none exist to prevent error response
    ranges = x;  // assign 'ranges' variable to whatever was passed into func
    return bullet;   // return bullet parent element with newly assigned 'ranges' array values
  };

  // markers (previous, goal)
  bullet.markers = function(x) {     // set 'bullet' key to an accessor function in order to access the markers array (each element has a sub-array in the event of more than one marker (i.e. data driving the placement of the vertical line))
    if (!arguments.length) return markers;  // if no argument is passed in, return existing ranges or emplty array none exist to prevent error response
    markers = x;   // assign 'markers' variable to whatever was passed into func
    return bullet;     // return bullet parent element with newly assigned 'markers' array values
  };

  // measures (actual, forecast)
  bullet.measures = function(x) {   // set 'bullet' key to an accessor function in order to access the measures array (each element has a 2 sub-element array (i.e. data driving the inner rects that make up the slider))
    if (!arguments.length) return measures;   // if no argument is passed in, return existing ranges or emplty array none exist to prevent error response
    measures = x;   // assign 'measures' variable to whatever was passed into func
    return bullet;     // return bullet parent element with newly assigned 'measures' array values
  };

  bullet.width = function(x) {    // accessor function to set the width of the overall bullet chart  (used to determine what the x1 coordinate should be)
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {     // accessor function to set the height of the overall bullet chart  (used to determine what the y1 coordinate should be)
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {  // accessor function to set the number of decimal points/other formatting for the ticks along the chart scale
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {   // accessor function to set the duration of the animation triggered on initial load
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

  return bullet;    // return the bullet DOM parent with all the above code run in the d3.bullet function
};

function bulletRanges(d) {  // accessor function for the subarray elements of the 'ranges' array
  return d.ranges;   //=>  sub array values: [width of green rect, width of yellow rect, width of red rect]
}

function bulletMarkers(d) {   // accessor function for the subarray elements of the 'markers' array
  return d.markers;   // => returns x1 coordinate (x0 being bullet scale origin)
}

function bulletMeasures(d) {   // accessor function for the subarray elements of the 'measures' array
  return d.measures;    //=>  sub array values: [width of target value rect, width of remaining slider width 'empy' rect]
}

function bulletTranslate(x) {    // for DRY code purposes => 'translate' syntax too verbose
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}

function bulletWidth(x) {      // for DRY code purposes => calculates the width (i.e. x1 - x0) for each rect in the parent bullet DOM element
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}

})();

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
