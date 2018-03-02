import React, { Component } from "react";
import {Line, Bar, Doughnut} from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { getUser } from "../../ducks/reducer";
// import {getTransactions} from "../../ducks/reducer";
import { logout } from "../../ducks/reducer";


class Chart extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            chartData: {
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
    }
    componentDidMount(){
        this.props.getUser();
        //     let temp1 = this.state.chartData.datasets[0].data;
        //    temp1.push(Math.floor(Math.random()*100));
        //     temp1 = temp1.slice(1,1);
        //    let temp2 = this.state.chartData;
        //    console.log(temp1);
        //    temp2.datasets[0].data = temp1;
        //    console.log(temp1);
        //     console.log('currentstate', this.state.chartData);
        //     console.log('temp2', temp2);
          }


      render(){
        return (
            <div className='chartWrapper'>
            {this.props.user.id > 0 && <div className='chart'>
                    <Line className='chartInner' data={this.state.chartData} options={null} width="600" height="240"/>
                </div>}
                {this.props.user.id > 0 && <div className='chart'>
                    <Bar className='chartInner' data={this.state.chartData} options={null} width="600" height="250"/>
                </div>}
                {this.props.user.id > 0 && <div className='chart'>
                    <Doughnut className='chartInner' data={this.state.chartData2} options={null} width="600" height="250"/>
                </div> }
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getUser, logout})(Chart));