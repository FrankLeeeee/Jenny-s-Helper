import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import logo from "@/assets/logo.png";
import { withRouter, Link } from "react-router-dom";

class Login extends Component {
  loginOnSubmit = event => {
    event.preventDefault();
    this.props.history.push("/teacher/home");
  };

  render() {
    return (
      <div className="general-form w-500 rounded">
        <form onSubmit={this.loginOnSubmit}>
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
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="密码"
              value=""
            />
          </div>
          <div className="form-group text-center">
            <input type="submit" className="btnSubmit" value="登录" />
          </div>
          <div className="form-group text-center">
            <Link to="/changePassword" className="ForgetPwd">
              更改密码
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
