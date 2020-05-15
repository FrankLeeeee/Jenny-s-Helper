import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import ChangePasswordPage from "./pages/changePasswordPage";
import SuccessPage from "./pages/successPage";
import TeacherHomePage from "./pages/teacherHome";
import AddDictationPage from "./pages/addDictationPage";
import DictationPage from "./pages/dictationPage";
import StudentHomePage from "./pages/studentHome";
import AllStudentResutlsPage from "./pages/allStudentResultsPage";

const MyRouter = () => (
  <Router>
    <Switch>
      // login page
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/changePassword" component={ChangePasswordPage} />
      <Route
        exact
        path="/changePassword/success"
        component={() => <SuccessPage message="密码更改成功" url="/" />}
      />
      <Route exact path="/teacher/home" component={TeacherHomePage} />
      <Route exact path="/teacher/addDictation" component={AddDictationPage} />
      <Route
        exact
        path="/teacher/addDictation/success"
        component={() => (
          <SuccessPage message="听写添加成功" url="/teacher/home" />
        )}
      />
      <Route exact path="/student/home" component={StudentHomePage} />
      <Route
        exact
        path="/student/dictation/uncompleted/:task_id"
        component={(props) => (
          <DictationPage
            {...props}
            allowSubmit={true}
            completed={false}
            readOnly={false}
            showResubmitButton={false}
            showHighlight={false}
          />
        )}
      />
      <Route
        exact
        path="/student/dictation/completed/:task_id"
        component={(props) => (
          <DictationPage
            {...props}
            allowSubmit={false}
            completed={true}
            readOnly={true}
            showResubmitButton={true}
            showHighlight={true}
          />
        )}
      />
      <Route
        exact
        path="/student/dictation/submission"
        component={() => (
          <SuccessPage
            message="你已成功提交作业，本次听写及格"
            url="/student/home"
          />
        )}
      />
      <Route
        exact
        path="/teacher/dictation/:task_id"
        component={AllStudentResutlsPage}
      />
      <Route
        exact
        path="/teacher/dictation/:task_id/:user_id"
        component={(props) => (
          <DictationPage
            {...props}
            allowSubmit={false}
            completed={true}
            readOnly={true}
            showResubmitButton={false}
            showHighlight={true}
          />
        )}
      />
    </Switch>
  </Router>
);

export default MyRouter;
