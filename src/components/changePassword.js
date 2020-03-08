import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import logo from "@/assets/logo.png";
import { withRouter } from "react-router-dom";

class ChangePassword extends Component {
  changePasswordOnSubmit = event => {
    event.preventDefault();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="general-form w-500 rounded">
        <form onSubmit={this.changePasswordOnSubmit}>
          <div className="text-center mb-3">
            <img src={logo} width="100px" alt="logo" />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              value=""
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="原密码"
              value=""
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="新密码"
              value=""
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="确认新密码"
              value=""
            />
          </div>
          <div className="form-group text-center">
            <input type="submit" className="btnSubmit" value="更改密码" />
          </div>
          <div className="form-group text-center">
            <a href="/" className="ForgetPwd">
              登录
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ChangePassword);
