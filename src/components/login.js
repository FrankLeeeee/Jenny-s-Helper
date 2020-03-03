import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import logo from "../../public/assets/logo.png";

export default class Login extends Component {
  render() {
    return (
      <div className="page-center general-form height-400 rounded">
        <form>
          <div className="text-center mb-3">
            <img src={logo} width="100px" />
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
            <a href="#" className="ForgetPwd">
              忘记密码?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
