const renderCard = (data) => {
  let width = 400,
    height = 100,
    backBarWidth = 350;

  let svg = d3.select('div#' + data.name)
    .append('svg')
    .attr('height', height)
    .attr('width', width);

  svg.append('text')
    .text(data.cardTitle)
    .attr('class', 'cardTitle')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height - 10);

  svg.append('rect')
    .attr('class', 'backgroundRect')
    .attr('x', width / 16)
    .attr('y', height / 5)
    .attr('width', backBarWidth)
    .attr('height', height / 4);

  svg.append('g')
    .append('rect')
    .attr('class', 'barRect ' + data.name)
    .attr('x', width / 16)
    .attr('y', height / 10)
    .attr('width', (data.value / data.max) * backBarWidth)
    .attr('height', height / 2)
    .attr('fill', (d, i) => { return colorScale(i) });

  d3.select('input[type=range].' + data.name)
    .attr('value', data.value)
    .attr('min', data.min)
    .attr('max', data.max)

  d3.selectAll('input[type=range].slider.' + data.name)
    .property('defaultValue', data.value )

  d3.select('.sliderMin.' + data.name)
    .attr('value', data.min)

  d3.select('.sliderMax.' + data.name)
    .attr('value', data.max)

  // change values when slider is dragged
  d3.select('input[type=range].' + data.name + '.slider').on('input', function() {
    data.value = this.value;
    let barRatio = this.value / data.max;
    svg.selectAll('.barRect')
      .attr('width', backBarWidth * barRatio);

    d3.select('output.slider.' + data.name)
      .text(function(d) {
        return '$' + d3.format(',')(d)
      }(Math.floor(this.value / 100) * 100))
  });

  // change values when min or max changes
  d3.selectAll('input[type=number].' + data.name + '.sliderRange').on('change', function() {
    let newRange = (this.name === 'sliderMin') ? data.min = this.value
                                               : data.max = this.value;
    let newRatio = (data.max - data.min) / data.value;
    d3.selectAll('input[type=range].' + data.name)
      .attr('value', (newRatio * this.value))
      .attr('min', (this.name === 'sliderMin') ? this.value
                                               : data.min)
      .attr('max', (this.name === 'sliderMax') ? this.value
                                               : data.max);
   svg.selectAll('.barRect')
      .attr('width', function() {
        return (data.value / data.max) * backBarWidth;
      });
  })

  // change button text, disable/enable input lock
  d3.selectAll('.unlockBtn.' + data.name).on('click', function() {
    this.innerHTML === 'Unlock range' ? this.innerHTML='Lock range'
                                : this.innerHTML='Unlock range';
    let ranges = [].slice.call(document.querySelectorAll('.sliderRange.' + data.name));
    ranges.forEach(function(range) {
      $(range).prop('disabled', (i, v) => { return !v });
      $(range).hasClass('unlocked') ? $(range).removeClass('unlocked')
                                    : $(range).addClass('unlocked');
    })
    // let sliders = document.querySelectorAll('.slider.' + data.name);
    // sliders.forEach(function(slider) {
    //   $(slider).prop('disabled', (i, v) => { return !v });
    //   $(slider).hasClass('unlocked') ? $(range).removeClass('unlocked')
    //                                  : $(range).addClass('unlocked');
    // })
  });
};
