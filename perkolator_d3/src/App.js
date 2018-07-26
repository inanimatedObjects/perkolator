import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import _ from 'lodash';
import SummaryPanel from './scripts/SummaryPanel';
import StackedBars from './scripts/StackedBars';
import SliderPanel from './scripts/SliderPanel';
import AnalyticsPanel from './scripts/AnalyticsPanel';

import compData from './data/offerSheet.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
