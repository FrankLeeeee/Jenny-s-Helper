import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";

export default class StudentHomePage extends Component {
  constructor(props) {
    super(props);

    var today = new Date();
    var month = "" + (today.getMonth() + 1),
      year = "" + today.getFullYear(),
      day = "" + today.getUTCDate();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    this.state = {
      today: {
        year: year,
        month: month,
        day: day,
      },
      uncompleted_month_choice: {
        year: year,
        month: month,
      },
      completed_month_choice: {
        year: year,
        month: month,
      },
      today_tasks: [],
      uncompleted_tasks: [],
      completed_tasks: [],
    };
  }

  componentWillMount = () => {
    // fetch the current dictation tasks
    fetch(
      `http://localhost:8000/student/quiz/completion?select_time=${this.state.today.year}-${this.state.today.month}`,
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
          var tasks = this.group_tasks(res.subjects);

          this.setState({
            today_tasks: tasks.today_tasks,
            uncompleted_tasks: tasks.uncompleted_tasks,
            completed_tasks: tasks.completed_tasks,
          });
        } else {
          NotificationManager.error("获取听写作业失败", "Error", 3000);
        }
      });
  };

  group_tasks = (subjects) => {
    var today_tasks = subjects.filter(this.filter_today_tasks);
    var completed_tasks = subjects.filter(this.filter_completed_tasks);
    var uncompleted_tasks = subjects.filter(this.filter_uncompleted_tasks);
    return {
      today_tasks: today_tasks,
      completed_tasks: completed_tasks,
      uncompleted_tasks: uncompleted_tasks,
    };
  };

  filter_today_tasks = (item) => {
    var date = item.task_id.split("-");
    if (
      date[0] == this.state.today.year &&
      date[1] == this.state.today.month &&
      date[2] == this.state.today.day &&
      !item.completion
    ) {
      return true;
    } else {
      return false;
    }
  };

  filter_completed_tasks = (item) => {
    var date = item.task_id.split("-");

    if (item.completion) {
      return true;
    } else {
      return false;
    }
  };

  filter_uncompleted_tasks = (item) => {
    var date = item.task_id.split("-");

    if (
      date[0] == this.state.today.year &&
      date[1] == this.state.today.month &&
      date[2] == this.state.today.day
    ) {
      return false;
    } else if (!item.completion) {
      return true;
    } else {
      return false;
    }
  };

  render_today_tasks = () => {
    return (
      <div className="row">
        <div className="col">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h1 className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    今日听写
                  </h1>
                  <table className="table mb-0">
                    <tbody>
                      {this.state.today_tasks.length == 0 ? (
                        <tr>
                          <th scope="row">无</th>
                        </tr>
                      ) : (
                        this.state.today_tasks.map((item, idx) => {
                          var url = `/student/dictation/${item.task_id}?completed=false`;
                          return (
                            <tr key={idx}>
                              <th scope="row">
                                <Link
                                  className="mb-0 font-weight-bold"
                                  to={url}
                                >
                                  {item.task_id}
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
    );
  };

  render_uncompleted_tasks = () => {
    return (
      <div className="row">
        <div className="col mt-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h1 className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    未完成
                  </h1>
                  <table className="table mb-0">
                    <tbody>
                      {this.state.uncompleted_tasks.length == 0 ? (
                        <tr>
                          <th scope="row">无</th>
                        </tr>
                      ) : (
                        this.state.uncompleted_tasks.map((item, idx) => {
                          var url = `/student/dictation/${item.task_id}?completed=false`;
                          return (
                            <tr key={idx}>
                              <th scope="row">
                                <Link
                                  className="mb-0 font-weight-bold text-warning"
                                  to={url}
                                >
                                  {item.task_id}
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
    );
  };

  render_completed_tasks = () => {
    return (
      <div className="row">
        <div className="col mt-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h1 className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    已完成
                  </h1>
                  <table className="table mb-0">
                    <tbody>
                      {this.state.completed_tasks.length == 0 ? (
                        <tr>
                          <th scope="row">无</th>
                        </tr>
                      ) : (
                        this.state.completed_tasks.map((item, idx) => {
                          var url = `/student/dictation/${item.task_id}?completed=true`;

                          return (
                            <tr key={idx}>
                              <th scope="row">
                                <Link
                                  className="mb-0 font-weight-bold text-success"
                                  to={url}
                                >
                                  {item.task_id}
                                </Link>
                              </th>
                              <th>
                                {item.pass ? (
                                  <span class="badge badge-success">及格</span>
                                ) : (
                                  <span class="badge badge-danger">未及格</span>
                                )}
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
    );
  };

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="container mt-5">
          <div>{this.render_today_tasks()}</div>
          <div>{this.render_uncompleted_tasks()}</div>
          <div>{this.render_completed_tasks()}</div>
        </div>
        <div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}
