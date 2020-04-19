import React, { Component } from "react";
import Navbar from "../components/navbar";
import SuccessFeedback from "../components/successFeedback";
import "../static/app.css";

export default class ChangePasswordSuccessPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="page-center">
          <SuccessFeedback message={"密码更改成功"} backURL={"/"} />
        </div>
      </div>
    );
  }
}
