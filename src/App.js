import React, { Component } from "react";
import "./App.css";

import routes from "./routes";

import Header from "./components/Header/Header";
import Chart from "./components/Charts/Chart";

class App extends Component {
  constructor(){
  super();
  this.state = {
    }
}

  render() {
    return (
      <div className='entireApp'>
        <Header />  
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default App;