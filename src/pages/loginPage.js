import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import Login from "../components/login";
import "../static/app.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default class LoginPage extends Component {
  notify = (msg_type, msg) => {
    switch (msg_type) {
      case "success":
        NotificationManager.success(msg, "Success", 3000);
        break;
      case "warning":
        NotificationManager.warning(msg, "Warning", 3000);
        break;
      case "error":
        NotificationManager.error(msg, "Error", 3000);
        break;
    }
  };

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="page-center">
          <Login notifyFn={this.notify} />
        </div>
        <div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}
