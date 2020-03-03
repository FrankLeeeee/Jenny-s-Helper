import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import thermometer from "../../public/assets/thermometer.png";

export default class Temperature extends Component {
  render() {
    return (
      <div className="page-center general-form height-300 rounded">
        <form>
          <div className="text-center mb-3">
            <img src={thermometer} width="100px" />
          </div>
          <div className="form-group mt-5">
            <input
              type="text"
              className="form-control"
              placeholder="输入当日体温"
              value=""
            />
          </div>
          <div className="form-group text-center">
            <input type="submit" className="btnSubmit" value="提交" />
          </div>
        </form>
      </div>
    );
  }
}
