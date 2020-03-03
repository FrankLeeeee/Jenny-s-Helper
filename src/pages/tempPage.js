import React, { Component } from "react";
import Navbar from "../components/navbar";
import Temperature from "../components/temperate";
import "../static/app.css";

export default class TempPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="container">
          <Temperature />
        </div>
      </div>
    );
  }
}
