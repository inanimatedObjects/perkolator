var Slider = function(opts) {
  this.data = opts.data;
  this.element = opts.element;

  this.draw();
}

Slider.prototype.draw = function() {
  this.width = 300;
  this.height = 200;

  this.element.innerHTML = '';
  const svg = d3.select(this.element).append('svg');
  svg.attr('width',  this.width);
  svg.attr('height', this.height);

  this.card = svg.append('g')

};

Slider.prototype.createScale = function() {
  this.scale = d3.scaleLinear()
};

Slider.prototype.hasDrivers = function() {
  // check if the card has drivers
    // if yes, append extra sliders
};
