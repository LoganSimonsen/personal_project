import React, { Component } from "react";
import {Line, Bar, Doughnut} from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import LineChart from './LineChart';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import DoughnutChart from './DoughnutChart';
import { getUser } from "../../ducks/reducer";
// import {getTransactions} from "../../ducks/reducer";
import { logout } from "../../ducks/reducer";


class Chart extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.getUser();
          }

      render(){
        return (
            <div className='chartWrapper'>
                <div className='lineChartViewport' > 
                    <a href="/#/LineChart" >
                    <LineChart href='/LineChart'>View</LineChart>
                    </a>
                </div>
                <div className='lineChartViewport' > 
                    <a href="/#/BarChart" >
                    <BarChart />
                    </a>
                </div>
                <div className='lineChartViewport'> 
                <a href="/#/RadarChart" >
                    <RadarChart />
                    </a>
                </div>
                
                <div className='lineChartViewport'> 
                <a href="/#/DoughnutChart" >
                    <DoughnutChart />
                    </a>
                </div>
                
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getUser, logout})(Chart));