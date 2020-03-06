import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import TempPage from "./pages/tempPage";

const MyRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/temperature" component={TempPage} />
      </Switch>
    </div>
  </Router>
);

export default MyRouter;
