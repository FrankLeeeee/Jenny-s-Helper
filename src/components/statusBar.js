import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./timer";

export default class StatusBar extends React.Component {
  render() {
    return (
      <div className="fluid-container pl-3 pr-3">
        <div className="row">
          <div className="col">
            <div className="float-left">
              <Timer min={3} />
            </div>
            <div className="float-right">
              <button class="btn btn-success">开始</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
