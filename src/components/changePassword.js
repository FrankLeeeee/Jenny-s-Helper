import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import logo from "@/assets/logo.png";
import { withRouter } from "react-router-dom";
import toast from "../toast/toast";
import apis from "../apis";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      old_password: "",
      new_password: "",
      new_password_repeat: "",
    };
  }

  backToLogin = () => {
    this.props.history.push("/");
  };

  changePasswordOnSubmit = (event) => {
    event.preventDefault();

    if (this.state.new_password != this.state.new_password_repeat) {
      toast.error("两次输入的密码不一致");
    } else {
      fetch(apis.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          old_password: this.state.old_password,
          new_password: this.state.new_password,
        }),
        mode: "cors",
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.props.history.push("/changePassword/success");
          } else {
            toast.error("用户名或者密码错误");
          }
        });
    }
  };

  onFormInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
              name="user_id"
              value={this.state.user_id}
              onChange={this.onFormInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="原密码"
              name="old_password"
              value={this.state.old_password}
              onChange={this.onFormInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="新密码"
              name="new_password"
              value={this.state.new_password}
              onChange={this.onFormInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="确认新密码"
              name="new_password_repeat"
              value={this.state.new_password_repeat}
              onChange={this.onFormInputChange}
              required
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
