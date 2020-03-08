import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default class TeacherHomePage extends Component {
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
          <div className="row">
            <div className="col">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <h1 className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        添加听写
                      </h1>
                      <Link
                        className="mb-0 font-weight-bold"
                        to="/teacher/addDictation"
                      >
                        点击开始
                      </Link>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mt-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <h1 className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        听写成绩
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
