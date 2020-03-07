import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import Login from "../components/login";
import "../static/app.css";

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="page-center">
          <Login />
        </div>
      </div>
    );
  }
}
