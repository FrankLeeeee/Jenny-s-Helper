import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";

export default class StudentHomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="container mt-5">
          <div claclassNames="row">
            <div className="col">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <h1 className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        今日听写
                      </h1>
                      <a
                        className="mb-0 font-weight-bold"
                        href="/student/dictation"
                      >
                        点击开始
                      </a>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div claclassNamess="row">
            <div className="col mt-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <h1 className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        已完成
                      </h1>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        list
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
