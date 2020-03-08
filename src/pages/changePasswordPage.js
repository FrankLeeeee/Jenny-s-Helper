import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import ChangePassword from "../components/ChangePassword";
import "../static/app.css";

export default class ChangePasswordPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="page-center">
          <ChangePassword />
        </div>
      </div>
    );
  }
}
