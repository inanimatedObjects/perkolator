const renderSummaryPanel = (data) => {
  let width = 1200,
    height = 200,
    summaryData = [
      [ "Cash", (data[0].value + data[1].value + data[2].value) ],
      [ "Equity", (data[3].value + data[4].value + data[5].value) ],
      [ "Perks", (data[6].value + data[7].value + data[8].value) ],
      [ "Time", (- data[9].value + data[10].value + data[11].value) ]
    ],
    svg = d3.select('#summaryPanel').append('svg')
      .attr('width', width)
      .attr('height', height);

  let summaryText = summaryData.forEach((d, i) => {
    svg.append('g')
      .append('text')
      .attr('text-anchor', 'middle')
      .text(d[0] + " : " + d[1])
      .attr('x', (((width / 4) * i) + 100))
      .attr('y', 100)
  })

  d3.selectAll('input[type=range]').on('input', function() {
    console.log(this)
  })

}
