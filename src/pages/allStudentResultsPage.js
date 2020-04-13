import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import "../static/app.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "@fortawesome/fontawesome-free/js/all";
import { Link } from "react-router-dom";

export default class AllStudentResutlsPage extends Component {
  constructor(props) {
    super(props);
    let task_id = this.props.match.params.task_id;
    this.state = {
      task_id: task_id,
      student_list: [],
    };
  }

  componentWillMount = () => {
    // this.setState({
    //   studnet_list: [
    //     {
    //       student_name: "jenny",
    //       student_id: "20200001",
    //       pass: false,
    //       completion: true,
    //     },
    //   ],
    // });
    fetch(`http://47.74.186.167:8080/pass/get?task_id=${this.state.task_id}`, {
      method: "GET",
      headers: {
        token: window.localStorage.token,
      },
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({
            student_list: res.subjects.student_list,
          });
          console.log(this.state);
        } else {
          NotificationManager.error("加载学生名单失败", "Error", 3000);
        }
      });
  };

  renderStudentList = () => {
    console.log(this.state);
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">名字</th>
            <th scope="col">完成情况</th>
            <th scope="col">及格情况</th>
            <th scope="col">查看作业</th>
          </tr>
        </thead>
        <tbody>
          {this.state.student_list.map((item, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{item.student_name}</th>
                {item.completion ? (
                  <td>
                    <span className="badge badge-success">完成</span>
                  </td>
                ) : (
                  <td>
                    <span className="badge badge-danger">未完成</span>
                  </td>
                )}
                {item.pass ? (
                  <td>
                    <span className="badge badge-success">及格</span>
                  </td>
                ) : (
                  <td>
                    <span className="badge badge-danger">不及格</span>
                  </td>
                )}
                <td>
                  <Link
                    className="btn btn-info btn-sm"
                    type="button"
                    to={`/teacher/dictation/${this.state.task_id}/${item.student_id}`}
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  backToHome = () => {
    this.props.history.push("/teacher/home");
  };

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="mt-5 pt-3 container">
          <div className="row">
            <div className="col">
              <div className="text-center float-center">
                <h4>{this.state.task_id}</h4>
              </div>
              <div className="float-right pr-3 mb-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.backToHome}
                >
                  返回
                </button>
              </div>
            </div>
          </div>
          <div>{this.renderStudentList()}</div>
        </div>
        <div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}