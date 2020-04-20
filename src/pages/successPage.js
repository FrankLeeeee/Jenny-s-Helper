import React, { Component } from "react";
import Navbar from "../components/navbar";
import SuccessFeedback from "../components/successFeedback";
import "../static/app.css";

export default class SuccessPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="page-center">
          <SuccessFeedback
            message={this.props.message}
            backURL={this.props.url}
          />
        </div>
      </div>
    );
  }
}
