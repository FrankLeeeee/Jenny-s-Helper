import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import toast from "../toast/toast";
import utils from "../utils";

export default class StudentHomePage extends Component {
  constructor(props) {
    super(props);

    var today = utils.getToday();

    this.state = {
      today: today,
      uncompleted_month_choice: {
        year: today.year,
        month: today.month,
      },
      completed_month_choice: {
        year: today.year,
        month: today.month,
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
          toast.error("获取听写作业失败");
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

  render_container = (title, color, renderContentFn) => {
    return (
      <div className="row">
        <div className="col mt-4">
          <div className={`card border-left-${color} shadow h-100 py-2`}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h1
                    className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}
                  >
                    {title}
                  </h1>
                  <table className="table mb-0">{renderContentFn()}</table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render_content_for_today_tasks = () => {
    return (
      <tbody>
        {this.state.today_tasks.length == 0 ? (
          <tr>
            <th scope="row" className="text-primary">
              无
            </th>
          </tr>
        ) : (
          this.state.today_tasks.map((item, idx) => {
            var url = `/student/dictation/uncompleted/${item.task_id}`;
            return (
              <tr key={idx}>
                <th scope="row">
                  <Link className="mb-0 font-weight-bold text-primary" to={url}>
                    {item.task_id}
                  </Link>
                </th>
              </tr>
            );
          })
        )}
      </tbody>
    );
  };

  render_content_for_uncompleted_tasks = () => {
    return (
      <tbody>
        {this.state.uncompleted_tasks.length == 0 ? (
          <tr>
            <th scope="row" className="text-warning">
              无
            </th>
          </tr>
        ) : (
          this.state.uncompleted_tasks.map((item, idx) => {
            var url = `/student/dictation/uncompleted/${item.task_id}`;
            return (
              <tr key={idx}>
                <th scope="row">
                  <Link className="mb-0 font-weight-bold text-warning" to={url}>
                    {item.task_id}
                  </Link>
                </th>
              </tr>
            );
          })
        )}
      </tbody>
    );
  };

  render_content_for_completed_tasks = () => {
    return (
      <tbody>
        {this.state.completed_tasks.length == 0 ? (
          <tr>
            <th scope="row" className="text-success">
              无
            </th>
          </tr>
        ) : (
          this.state.completed_tasks.map((item, idx) => {
            var url = `/student/dictation/completed/${item.task_id}`;

            return (
              <tr key={idx}>
                <th scope="row">
                  <Link className="mb-0 font-weight-bold text-success" to={url}>
                    {item.task_id}
                  </Link>
                </th>
                <th>
                  {item.pass ? (
                    <span className="badge badge-success">及格</span>
                  ) : (
                    <span className="badge badge-danger">未及格</span>
                  )}
                </th>
              </tr>
            );
          })
        )}
      </tbody>
    );
  };

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="container mt-5">
          <div>
            {this.render_container(
              "今日听写",
              "primary",
              this.render_content_for_today_tasks
            )}
          </div>
          <div>
            {this.render_container(
              "未完成",
              "warning",
              this.render_content_for_uncompleted_tasks
            )}
          </div>
          <div>
            {this.render_container(
              "已完成",
              "success",
              this.render_content_for_completed_tasks
            )}
          </div>
        </div>
      </div>
    );
  }
}
