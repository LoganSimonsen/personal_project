import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Chart from "./components/Charts/Chart";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import RadarChart from "./components/Charts/RadarChart";
import DoughnutChart from "./components/Charts/DoughnutChart";
import AdminPortal from './components/AdminPortal/AdminPortal';
import Report from './components/Report/Report';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Chart" component={Chart} />
    <Route exact path="/LineChart" component={LineChart} />
    <Route exact path="/BarChart" component={BarChart} />
    <Route exact path="/RadarChart" component={RadarChart} />
    <Route exact path="/DoughnutChart" component={DoughnutChart} />
    <Route exact path="/AdminPortal" component={AdminPortal} />
    <Route exact path="/Report" component={Report} />
    <Route
      path="*"
      render={() => (
        <div>
          <p>Not Found</p>
        </div>
      )}
    />
  </Switch>
);