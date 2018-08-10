module.exports = (path, angles) => {
  d3.timer(function() {
    path.attr("d", function(d) {
      return d(angles);
    });
  });
}
