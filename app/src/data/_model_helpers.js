
//  * form of contract consideration
const compType = ["cash", "equity", "perks", "time"];

// * summaryPanel *************************************
  // ** sum compType values
  let sumCashVal = sumCompTypeInputs(upFrontVal + rateBasedVal + intervalBasedVal);
  let sumEquityVal = sumCompTypeInputs(upFrontVal + rateBasedVal + intervalBasedVal);
  let sumPerksVal = sumCompTypeInputs(upFrontVal + rateBasedVal + intervalBasedVal);
  let sumTimeVal = sumCompTypeInputs(upFrontVal + rateBasedVal + intervalBasedVal);


// stackBarPanel *************************************
  // * data values



// sliderPanel *************************************
  // * data model drivers
  let panelArr = [], // each of the comp types
      summaryBarWidth,
      backgoundBarWidth,
      panelOutputNumber,
      minInput,
      maxInput,
      slider,
      sliderHandle;


      panelOutput = xSet - xMin;
      barRatio = (xSet - xMin) / (xMax - xMin);
      outputBarWidth = barRatio * totalWidth;
      backgoundBarWidth = (1 - barRatio) * totalWitdth;
      xMin = 0;
      xMax = 100,
      xSet = d3.select(".panel").data.value,
      xSliderHandle = [xMin, xSet];


      // slider,



  // let sliderMin,
  //     sliderMax,
  //     sliderValue;
  //
  // // *** driver-derived values
  // let xAxis_domain_start = 0;
  // let xAxis_domain_end = sliderMax;
  // let xAxis_range_start = 0;
  // let xAxis_range_end = 100;
  //
  // let sliderDomainExtent = [xAxisStart, xAxisStart];
  // let sliderRangeExtent = [xAxisStart, xAxisStart];
  //
  // const slider = (data, scale, sliderDomainExtent, sliderRangeExtent) => {
  //
  // }














// * sliderPanel
  // ** baseDriver values
  let cash_upFront,
      cash_rateBased,
      cash_intervalBased,
      equity_upFront,
      equity_rateBased,
      equity_intervalBased,
      perks_upFront,
      perks_rateBased,
      perks_intervalBased,
      time_upFront,
      time_rateBased,
      time_intervalBased;

      time_upFront = ;
      time_rateBased = ;
      time_intervalBased = ;



  // ** slider scale extent range values

const upFront = () => {

  }


const rateBased = (baseDriver, fiscalPeriod , compType) => {
  // assign a base denomination unit => 2000 is the USA 40 hour work week convention
  let hourlyRate = annualizedVal / 2000, // $50/hour paid to employee =>
      output = hourlyRate * intervalPeriod;

  // return the rate based value as single figure
  return '$' + output;
}


  function intervalBased = (amount, interval, compType) => {

  }



  let cash_upFront_xScale = [0, this.Extent.xEnd],
      cash_rateBased_xExtent = [0, this.Extent.xEnd],
      cash_intervalBased_xExtent = [0, this.Extent.xEnd],
      equity_upFront_xExtent = [0, this.Extent.xEnd],
      equity_rateBased_xExtent = [0, this.Extent.xEnd],
      equity_intervalBased_xExtent = [0, this.Extent.xEnd],
      perks_upFront_xExtent = [0, this.Extent.xEnd],
      perks_rateBased_xExtent = [0, this.Extent.xEnd],
      perks_intervalBased_xExtent = [0, this.Extent.xEnd],
      time_upFront_xExtent = [0, this.Extent.xEnd],
      time_rateBased_xExtent = [0, this.Extent.xEnd],
      time_intervalBased_xExtent = [0, this.Extent.xEnd];



  let slider_xScale = d3.scaleLinear()
    .domain([domainStart, domainEnd])
    .range([rangeStart, rangeEnd]);


    var y = d3.scaleLinear()
        .rangeRound([height, 0]);


// variable drivers for analyticsPanel





// *  converter functions to denominate all balances in USD

// **  employer consideration
const equityConverter = equityVal => {

}
const perksConverter = perksVal => {

}

// **  job candidate consideration
const timeConverter = timeVal => {

}





// let stackBarRect0 = panel[0].value;
// let stackBarRect1 = panel[1].value;
// let stackBarRect2 = panel[2].value;
// let stackBarRect3 = panel[3].value;
// let stackBarRect4 = panel[4].value;
// let stackBarRect5 = panel[5].value;
// let stackBarRect6 = panel[6].value;
// let stackBarRect7 = panel[7].value;
// let stackBarRect8 = panel[8].value;
// let stackBarRect9 = panel[9].value;
// let stackBarRect10 = panel[10].value;
// let stackBarRect11 = panel[11].value;
