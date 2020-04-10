import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import logo from "@/assets/logo.png";
import { withRouter, Link } from "react-router-dom";

class Login extends Component {
  state = {
    user_id: "",
    password: "",
  };

  loginOnSubmit = (event) => {
    event.preventDefault();
    fetch("http://franklee.online:8080/pong", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      mode: "cors",
      cache: "default",
    });

    // fetch("http://http://47.74.186.167:8080/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       let token = data.subjects.token;
    //       window.localStorage.setItem("token", token);
    //     } else {
    //       window.alert("wrong password");
    //     }
    //   });

    // this.props.history.push("/teacher/home");
  };

  userIdOnChange = (event) => {
    this.setState({ user_id: event.target.value });
  };

  passwordOnChange = (event) => {
    this.setState({ password: event.target.value });
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
              value={this.state.user_id}
              onChange={this.userIdOnChange}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="密码"
              value={this.state.password}
              onChange={this.passwordOnChange}
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
