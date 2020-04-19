import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import logo from "@/assets/logo.png";
import { withRouter, Link } from "react-router-dom";
import toast from "../toast/toast";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      password: "",
    };
  }

  handleEnterKey = (e) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  loginOnSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        password: this.state.password,
      }),
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let role = res.subjects.role;
          window.localStorage.setItem("token", res.subjects.token);
          window.localStorage.setItem("user_id", this.state.user_id);
          if (role == 0) {
            this.props.history.push("/student/home");
          } else if (role == 1) {
            this.props.history.push("/teacher/home");
          } else {
            toast.error("该用户类型不存在");
          }
        } else {
          toast.warning("用户名或者密码错误");
        }
      });
  };

  userIdOnChange = (event) => {
    this.setState({ user_id: event.target.value });
  };

  passwordOnChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="fluid-container">
        <div className="row">
          <div className="col float-center">
            <div className="general-form rounded">
              <form
                onSubmit={this.loginOnSubmit}
                onKeyDown={this.handleEnterKey}
              >
                <div className="text-center mb-3">
                  <img src={logo} width="50%" alt="logo" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="用户名"
                    value={this.state.user_id}
                    onChange={this.userIdOnChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="密码"
                    value={this.state.password}
                    onChange={this.passwordOnChange}
                    required
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
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
