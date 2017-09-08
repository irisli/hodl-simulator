import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import historicalData from './historicalData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawCode: '',
      parseError: false,
      results: null,
    }

    this.state.rawCode += 'function (a, b) {';
    this.state.rawCode += ' return a + b; }';

    this.stepFunction = new Function('return ' + this.state.rawCode)();

    this.handleInput = (event) => {
      console.log('hi')
      let erred = false;
      try {
        this.stepFunction = new Function('return ' + this.state.rawCode)();

      } catch (e) {
        erred = true;
      }
      this.setState({
        rawCode: event.target.value,
        parseError: erred,
      });
    };

    this.handleRun = (event) => {
      let result = this.stepFunction(1,2);
      let resultsElement = <div className="Results">
        {result}
      </div>
      this.setState({
        results: resultsElement
      });
    }
  }
  render() {
    console.log(historicalData)
    let errorMessage;
    if (this.state.parseError) {
      errorMessage = <div className="App__parseError">
        Parse error occured. Please check your JS syntax.
      </div>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HODL simulator</h2>
        </div>
        <p className="App-intro">
          <textarea className="App__function" value={this.state.rawCode} onChange={this.handleInput}></textarea>
        </p>
        <button onClick={this.handleRun}>Run simulation</button>
        {this.state.results}
      </div>
    );
  }
}

export default App;
