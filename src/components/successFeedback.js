import React from "react";
import "../static/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import tick from "@/assets/tick.png";

class SuccessFeedback extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="page-center">
        <div className="container text-center">
          <img src={tick} width="70%" alt="success" />
          <p className="mt-3">
            {this.props.message} - <a href={this.props.backURL}>点击返回</a>
          </p>
        </div>
      </div>
    );
  }
}

export default SuccessFeedback;
