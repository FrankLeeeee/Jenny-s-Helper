import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default class TeacherHomePage extends Component {
  constructor(props) {
    super(props);

    var today = new Date();
    var month = "" + (today.getMonth() + 1),
      year = "" + today.getFullYear();

    if (month.length < 2) month = "0" + month;

    this.state = {
      month_choice: {
        year: year,
        month: month,
      },
      task_ids: [],
    };
  }

  componentWillMount = () => {
    fetch(
      `http://47.74.186.167:8080/student/quiz/completion?select_time=${this.state.month_choice.year}-${this.state.month_choice.month}`,
      {
        method: "GET",
        headers: {
          token: window.localStorage.token,
        },
        mode: "cors",
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          var task_ids = res.subjects.map((item) => item.task_id);

          this.setState({
            task_ids: task_ids,
          });
        } else {
          NotificationManager.error("获取听写作业失败", "Error", 3000);
        }
      });
  };

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
                      <table className="table mb-0">
                        <tbody>
                          {this.state.task_ids.length == 0 ? (
                            <tr>
                              <th scope="row">无</th>
                            </tr>
                          ) : (
                            this.state.task_ids.map((item, idx) => {
                              var url = `/teacher/dictation/${item}`;
                              return (
                                <tr key={idx}>
                                  <th scope="row">
                                    <Link
                                      className="mb-0 font-weight-bold"
                                      to={url}
                                    >
                                      {item}
                                    </Link>
                                  </th>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
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
