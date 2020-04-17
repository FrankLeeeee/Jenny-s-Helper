import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@/assets/logo.png";
import toast from "../toast/index";

export default class Navbar extends React.Component {
  show = () => {
    toast.success("hey");
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-dark">
        <div className="navbar-brand text-white">
          <img
            src={logo}
            width="30"
            height="30"
            alt=""
            className="d-inline-block align-top mr-2"
          />
          Jenny's Helper
        </div>
        <button onClick={this.show}>btn</button>
      </nav>
    );
  }
}
