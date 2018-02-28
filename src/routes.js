import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Chart from "./components/Charts/Chart";
import AdminPortal from './components/AdminPortal/AdminPortal';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Chart" component={Chart} />
    <Route exact path="/AdminPortal" component={AdminPortal} />
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