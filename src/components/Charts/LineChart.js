import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { getUser } from "../../ducks/reducer";
// import {getTransactions} from "../../ducks/reducer";
import { logout } from "../../ducks/reducer";


let chartOptions: {	
    responsive: true,
    maintainAspectRatio: false
}

class LineChart extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            height: 600,
            width: 200,
            chartData: {
                maintainAspectRatio: false,
                responsive: true,
                labels: [10.00, 10.05, 10.10, 10.15, 10.20, 10.25, 10.30],
                datasets: [
                    {
                        label: "Approvals",
                        fill: true,
                        pointHoverRadius: 5,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [60, 45, 82, 43, 35, 56, 33],
                        spanGaps: true,
                        borderColor:'rgb(41, 255, 56)',
                        drawBorder: true,
                    },
                    {
                        label: "Declines",
                        fill: true,
                        pointHoverRadius: 5,
                        pointRadius: 1,
                        pointHitRadius: 5,
                        data: [6, 5, 8, 1, 3, 5, 10],
                        spanGaps: true,
                        borderColor: "red",
                        backgroundColor: "rgba(255, 45, 45,0.5)",
                    }
                ]
            },
            chartData2: {
                labels: [
                    'Approvals',
                    'Declines',
                ],
                datasets: [{
                    data: [300, 50],
                    backgroundColor: [
                    'rgb(41, 255, 56)',
                    "red",
                    ],
                    hoverBackgroundColor: [
                    'rgb(41, 255, 56)',
                    "red",
                    ]
                }]
            }
        }
        this.functionRunning = this.functionRunning.bind(this);
        this.functionRunning2 = this.functionRunning2.bind(this);
    }
    componentDidMount(){
        this.props.getUser();
        setInterval(this.functionRunning, 3000);
        setInterval(this.functionRunning2, 3000);
        console.log('dems', window.innerWidth)
        this.setState({height: window.innerHeight});
        this.setState({width: window.innerWidth});
          }
    
    functionRunning(){
        let temp1 = this.state.chartData.datasets[0].data;
           temp1.push(Math.floor(Math.random() * 31) + 50);
           temp1 = temp1.slice(1);
           let temp2 = this.state.chartData;
           temp2.datasets[0].data = temp1
           this.setState({chartData: temp2});
           
    }

    functionRunning2(){
        let temp1 = this.state.chartData.datasets[1].data;
           temp1.push(Math.floor(Math.random()*10));
           temp1 = temp1.slice(1);
           let temp2 = this.state.chartData;
           temp2.datasets[1].data = temp1
           this.setState({chartData: temp2});
    }
    

      render(){
        return (
            <div className='lineChartWrapper'>
            {this.props.user.id > 0 && <div className='chart'>
                    <Line className='lineChartInner' data={this.state.chartData} options={chartOptions}/>
            </div>}
        
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getUser, logout})(LineChart));