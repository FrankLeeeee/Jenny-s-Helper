import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
// import DictationPage from "./pages/dictationPage";
// import ChangePasswordPage from "./pages/changePasswordPage";
// import StudentHomePage from "./pages/studentHome";
// import TeacherHomePage from "./pages/teacherHome";
// import AddDictationPage from "./pages/addDictationPage";
// import AllStudentResutlsPage from "./pages/allStudentResultsPage";
// import StudentResultPage from "./pages/studentResultPage";

const MyRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      {/* <Route exact path="/student/home" component={StudentHomePage} />
      <Route exact path="/teacher/home" component={TeacherHomePage} />
      <Route exact path="/changePassword" component={ChangePasswordPage} />
      <Route
        exact
        path="/student/dictation/:task_id"
        component={DictationPage}
      />
      <Route exact path="/teacher/addDictation" component={AddDictationPage} />
      <Route
        exact
        path="/teacher/dictation/:task_id"
        component={AllStudentResutlsPage}
      />
      <Route
      exact
      path="/teacher/dictation/:task_id/:user_id"
      component={StudentResultPage}
    /> */}
    </Switch>
  </Router>
);

export default MyRouter;
