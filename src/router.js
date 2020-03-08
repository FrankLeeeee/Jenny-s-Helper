import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DictationPage from "./pages/dictationPage";
import ChangePasswordPage from "./pages/changePasswordPage";
import StudentHomePage from "./pages/studentHome";
import TeacherHomePage from "./pages/teacherHome";
import AddDictationPage from "./pages/addDictationPage";

const MyRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/student/home" component={StudentHomePage} />
      <Route exact path="/teacher/home" component={TeacherHomePage} />
      <Route exact path="/changePassword" component={ChangePasswordPage} />
      <Route exact path="/student/dictation" component={DictationPage} />
      <Route exact path="/teacher/addDictation" component={AddDictationPage} />
    </Switch>
  </Router>
);

export default MyRouter;
