const renderSummaryPanel = (data) => {
  console.log(categorySums(data))
  let width = 1200,
    height = 200,
    types = ["Cash", "Equity", "Perks", "Time"],
    summaryValues = types.concat(sumsArr),
    summaryData = [],
    svg = d3.select('#summaryPanel').append('svg')
      .attr('width', width)
      .attr('height', height);


  console.log(summaryValues)

  let summaryText = summaryData.forEach((d, i) => {
    svg.append('g')
      .append('text')
      .attr('class', d[0] + ' summary')
      .attr('text-anchor', 'middle')
      .text(summaryValues[])
      .attr('x', (((width / 4) * i) + 100))
      .attr('y', 100)
  })

  d3.selectAll('input[type=range]').on('input', function() {
    console.log(this)
  })

}
