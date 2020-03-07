import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DictationPage from "./pages/dictationPage";

const MyRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/temperature" component={LoginPage} />
      <Route exact path="/dictation" component={DictationPage} />
    </Switch>
  </Router>
);

export default MyRouter;
