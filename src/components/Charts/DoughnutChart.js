import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Fullscreen from "react-full-screen";

import { getUser } from "../../ducks/reducer";
// import {getTransactions} from "../../ducks/reducer";
import { logout } from "../../ducks/reducer";

let chartOptions: {
  responsive: true,
  maintainAspectRatio: false
};

class DoughnutChart extends Component {
  constructor() {
    super();
    this.state = {
      isFull: false,
      marginTop: "",
      theme: "#3D3A4B",
      height: 600,
      width: 200,
      chartData2: {
        labels: ["Approvals", "Declines"],
        datasets: [
          {
            data: [55, 5],
            backgroundColor: ["rgb(41, 255, 56)", "red"]
          }
        ]
      }
    };
    this.functionRunning = this.functionRunning.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
    setInterval(this.functionRunning, 3000);
    setInterval(this.functionRunning2, 3000);
  }

  functionRunning() {
    let temp = Math.floor(Math.random() * 31) + 50;
    let temp3 = Math.floor(Math.random() * 10);
    let temp2 = this.state.chartData2;
    temp2.datasets[0].data[0] = temp;
    this.setState({ chartData2: temp2 });
  }

  goFull = () => {
    this.setState({ isFull: true });
    this.setState({ marginTop: "0px" });
  };
  exitFull = () => {
    this.setState({ isFull: false });
    this.setState({ marginTop: "120px" });
  };
  changeTheme = () => {
    if (this.state.theme === "white") {
      this.setState({ theme: "#3D3A4B" });
    } else {
      this.setState({ theme: "white" });
    }
  };
  render() {
    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={isFull => this.setState({ isFull })}
      >
        <div className="DoughnutChartWrapper">
          {this.props.user.id > 0 && (
            <div
              className="chart"
              style={{
                backgroundColor: this.state.theme,
                marginTop: this.state.marginTop
              }}
            >
              <Doughnut
                className="DoughnutChartInner"
                data={this.state.chartData2}
                options={chartOptions}
              />
            </div>
          )}
          {window.location.href.includes("DoughnutChart") &&
            this.state.isFull === false && (
              <button id="fullscreenButton" onClick={this.goFull}>
                Go Fullscreen
              </button>
            )}
          {window.location.href.includes("DoughnutChart") &&
            this.state.isFull === true && (
              <button
                className="exitButton"
                id="fullscreenButton"
                onClick={this.exitFull}
              >
                Exit Fullscreen
              </button>
            )}
          {window.location.href.includes("DoughnutChart") && (
            <button id="toDarkThemeButton" onClick={this.changeTheme}>
              Theme
            </button>
          )}
        </div>
      </Fullscreen>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, logout })(DoughnutChart)
);
