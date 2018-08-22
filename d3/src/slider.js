(function() {

d3.sliderPanel = function() {
  var orient = "left",
      reverse = false,
      duration = 1000,
      // ranges = sliderRanges,
      // markers = sliderMarkers,
      measures = sliderMeasures,
      width = 480,
      height = 130,
      tickFormat = d3.format(",.1f");

    function outputSlider(g) {
      g.each(function(d, i) {
        var measurez = measures.call(this, d, i).slice().sort(d3.descending),
            g = d3.select(this);

      return sliderPanel;
  }




  function bulletTranslate(x) {    // for DRY code purposes => 'translate' syntax too verbose
    return function(d) {
      return "translate(" + x(d) + ",0)";
    };
  }

})();
