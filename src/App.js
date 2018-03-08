import React, { Component } from "react";
import Fullscreen from "react-full-screen";
import "./App.css";

import routes from "./routes";

import Header from "./components/Header/Header";
import Chart from "./components/Charts/Chart";

class App extends Component {
  constructor(){
  super();
  this.state = {
    isFull: false,
    }
}

goFull = () => {
  this.setState({ isFull: true });
}
exitFull = () => {
  this.setState({ isFull: false });
}
  render() {
    return (
      <div className='entireApp'>
        <Header />  
        
 
        <Fullscreen 
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}>
        {routes}
        {this.state.isFull === false && <button id='fullscreenButton' onClick={this.goFull}>
          Go Fullscreen
        </button>}
        {this.state.isFull === true && <button className='exitButton' id='fullscreenButton' onClick={this.exitFull}>
        Exit Fullscreen
      </button>}
        </Fullscreen>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default App;