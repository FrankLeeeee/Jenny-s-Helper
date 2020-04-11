import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import creatHistory from "history/createBrowserHistory";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default class AddDictationPage extends Component {
  state = {
    date: new Date(),
    wordlist: [],
    pass_count: 0,
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    // check whether the date if before today
    var today = new Date();

    if (
      today.getFullYear() > this.state.date.getFullYear() ||
      (today.getFullYear() == this.state.date.getFullYear() &&
        today.getUTCMonth() < this.state.date.getUTCMonth()) ||
      (today.getFullYear() == this.state.date.getFullYear() &&
        today.getUTCMonth() == this.state.date.getUTCMonth() &&
        today.getUTCDate() < this.state.date.getUTCDate())
    ) {
      NotificationManager.error(
        "无效日期，听写日期应该大于等于今天日期",
        "Error",
        3000
      );
    } else {
      console.log(this.state);
      fetch("http://localhost:8000/word/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: "7e88046b81d36c66202c8404da39df7a", //window.localStorage.getItem("token"),
        },
        body: JSON.stringify(this.state),
        mode: "cors",
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  };

  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  handleChineseChange = (e) => {
    var key = e.target.getAttribute("data-idx");
    var items = this.state.wordlist;
    items[key].chinese = e.target.value;

    this.setState({
      wordlist: items,
    });
  };

  handleEnglishChange = (e) => {
    var key = e.target.getAttribute("data-idx");
    var items = this.state.wordlist;
    items[key].english = e.target.value;

    this.setState({
      wordlist: items,
    });
  };

  handlePassCountChange = (e) => {
    this.setState({
      pass_count: parseInt(e.target.value),
    });
  };

  goBackPage = () => {
    const history = creatHistory();
    history.goBack();
  };

  addRow = () => {
    var list = this.state.wordlist.concat({ chinese: "", english: "" });
    this.setState({ wordlist: list });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container general-form rounded mt-5">
          <form onSubmit={this.onFormSubmit}>
            <h4 className="text-center">添加听写</h4>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="inputDate">日期</label>
                  <div>
                    <DatePicker
                      className="form-control"
                      selected={this.state.date}
                      onChange={this.handleDateChange}
                      required
                    />
                  </div>
                  <small id="dateHelp" className="form-text text-muted">
                    选择听写日期
                  </small>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="inputDate">及格题数</label>
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.pass_count}
                    onChange={this.handlePassCountChange}
                    required
                  ></input>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="exampleInputPassword1">单词列表</label>
                <button
                  type="button"
                  onClick={this.addRow}
                  className="btn btn-sm btn-primary float-right"
                >
                  添加单词
                </button>
              </div>
            </div>
            <div className="form-group mt-2">
              <table className="table">
                <thead>
                  <th scope="col">中文</th>
                  <th scope="col">英文</th>
                </thead>
                <tbody>
                  {this.state.wordlist.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            data-idx={idx}
                            value={this.state.wordlist[idx].chinese}
                            onChange={this.handleChineseChange}
                            required
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            data-idx={idx}
                            value={this.state.wordlist[idx].english}
                            onChange={this.handleEnglishChange}
                            required
                          ></input>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-center">
              <button
                onClick={this.goBackPage}
                type="button"
                className="btn btn-primary m-3"
              >
                返回
              </button>
              <button type="submit" className="btn btn-success m-3">
                完成
              </button>
            </div>
          </form>
        </div>
        <div className="container pl-3 pr-3"></div>
        <div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}
