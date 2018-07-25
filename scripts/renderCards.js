const renderCard = (data) => {
  let width = 400,
    height = 100,
    backBarWidth = 350,
    sliderByCname = document.querySelector('input.slider.' + data.name);
    min = document.querySelector('input.sliderMin.' + data.name),
    max = document.querySelector('input.sliderMax.' + data.name),
    output = Number(document.querySelector('output.slider.' + data.name).innerHTML.split(',').join('').split('$').join(''));

  d3.select('input[type=range].' + data.name)
    .attr('value', data.value / data.max)

  d3.selectAll('output[type=range].slider.' + data.name)
    .property('defaultValue', data.value )

  d3.select('.sliderMax.' + data.name)
    .attr('value', data.max)

  let svg = d3.select('div#' + data.name)
    .append('svg')
    .attr('height', height)
    .attr('width', width);

  svg.append('text')
    .text(data.cardTitle)
    .attr('class', 'title')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height - 10);

  svg.append('rect')
    .attr('class', 'backgroundRect')
    .attr('x', width / 16)
    .attr('y', height / 10)
    .attr('width', backBarWidth)
    .attr('height', height / 2);

  svg.append('g')
    .append('rect')
    .attr('class', 'barRect ' + data.name)
    .attr('x', width / 16)
    .attr('y', height / 20)
    .attr('width', (backBarWidth * sliderByCname.value) + 10)
    .attr('height', (height / 2) + 7)
    .attr('fill', (d, i) => { return colorScale(d) });

  // change values when slider is dragged
  d3.select('input[type=range].' + data.name + '.slider').on('input', function() {
    svg.selectAll('.barRect')
      .attr('width', this.value * backBarWidth);

    let newValue = this.value * data.max;

    d3.select('output.slider.' + data.name)
      .text(function(d) {
        return '$' + d3.format(',')(d)
      }(newValue));
  });

  // change values when min or max changes
  d3.selectAll('input[type=number].' + data.name + '.sliderRange').on('change', function() {
    let newRatio = this.name === 'sliderMin' ? output / (data.max)
                                             : output / (this.value);

    d3.select('input[type=range].' + data.name)
      .attr('value', newRatio)

    console.log(output, this.value, newRatio)

    d3.select('output[type=range].slider.' + data.name)
      .property('value', this.value * newRatio)
  })

  // change button text, disable/enable input lock
  d3.selectAll('.unlockBtn.' + data.name).on('click', function() {
    this.innerHTML === 'Unlock range' ? this.innerHTML='Lock range'
                                : this.innerHTML='Unlock range';
    let rangesArr = document.querySelectorAll('.sliderRange.' + data.name);
    rangesArr.forEach(function(range) {
      $(range).prop('disabled', (i, v) => { return !v });
      $(range).hasClass('unlocked') ? $(range).removeClass('unlocked')
                                    : $(range).addClass('unlocked');
    })
  });
};
