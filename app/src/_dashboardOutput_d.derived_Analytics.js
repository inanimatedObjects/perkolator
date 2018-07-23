import * as helpers from './helpers';
import {Slider} from './_primaryUI_keyDriver(manualInput)_Slider';
import {SliderGrid} from './_primaryUI_derived(d)_Slider';
import {RadarChart} from './_dashboardVisual_component_RadarChart';

export class Analytics { // instantiates the class
  /**
    * @param  {any} data   // data passed in, usually from child classes
    * @return {void} */

  constructor(data, ...args) {
    var d3 = require('d3'); // Require D3 via Webpack
    super();
    require('./css/_dashboard.css');

    this.data = data;
    this.svg = d3.select('div#chart').append('svg');

    this.margin = {
      left: 20,
      top: 20,
      right: 20,
      bottom: 20
    };

    this.svg.attr('width', window.innerWidth);
    this.svg.attr('height', window.innerHeight);

    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.chart = this.svg.append('g')
      .attr('width', this.width)
      .attr('height', this.height);
    }

    let p = new Promise((res, rej) => {
      d3.json('data/offer.json', (err, data) => err ? rej(err) : res(data));
    });


    p.then((data) => {
      this.data = data;
      this[chartType].call(this, ...args);
    });
  }




  /************ NOTE: expected code function:
        let inanimatedObjects_#Perkolator_#dashboardData = dataViz(container) => returns a data container Constructor;

        Purpose of Container => render the values for various compensation types to enable swift evaluation of job offer terms
  **************/
