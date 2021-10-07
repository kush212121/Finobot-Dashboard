import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Landing from "../components/Landing/Landing";
import NotFound from "../components/NotFound/NotFound";
import SetPass from "../components/SetPass/SetPass";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/set-pass/:id" component={SetPass} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
