import React, { Component } from "react";
import Navbar from "../components/navbar";
import SuccessFeedback from "../components/successFeedback";
import "../static/app.css";

export default class AddDictationSuccessPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="page-center">
          <SuccessFeedback
            message={"听写任务添加成功"}
            backURL={"/teacher/home"}
          />
        </div>
      </div>
    );
  }
}
