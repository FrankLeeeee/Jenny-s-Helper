import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserHistory as createHistory } from "history";
import toast from "../toast/toast";
import utils from "../utils";

export default class AddDictationPage extends Component {
  state = {
    date: new Date(),
    word_list: [],
    pass_count: 0,
  };

  handleEnterKey = (e) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    if (event.key === "Enter") {
      return null;
    }

    // check whether the date if before today
    var today = new Date();

    if (
      today.getFullYear() > this.state.date.getFullYear() ||
      (today.getFullYear() == this.state.date.getFullYear() &&
        today.getUTCMonth() > this.state.date.getUTCMonth()) ||
      (today.getFullYear() == this.state.date.getFullYear() &&
        today.getUTCMonth() == this.state.date.getUTCMonth() &&
        today.getUTCDate() > this.state.date.getUTCDate())
    ) {
      toast.error("无效日期，听写日期应该大于等于今天日期");
    } else if (
      this.state.pass_count > this.state.word_list.length ||
      this.state.pass_count < 0
    ) {
      toast.error("及格题数不能大于总题数或者为负");
    } else if (this.state.word_list.length == 0) {
      toast.error("没有添加听写内容");
    } else {
      fetch("http://localhost:8000/word/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: window.localStorage.token,
        },
        body: JSON.stringify({
          task_id: utils.formatDate(this.state.date),
          word_list: this.state.word_list,
          pass_count: this.state.pass_count,
        }),
        mode: "cors",
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.props.history.push("/teacher/addDictation/success");
          } else {
            toast.error("网络出错啦");
          }
        });
    }
  };

  backToHome = () => {
    this.props.history.push("/teacher/home");
  };

  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  handleChineseChange = (e) => {
    var key = e.target.getAttribute("data-idx");
    var items = this.state.word_list;
    items[key].chinese = e.target.value;

    this.setState({
      word_list: items,
    });
  };

  handleEnglishChange = (e) => {
    var key = e.target.getAttribute("data-idx");
    var items = this.state.word_list;
    items[key].english = e.target.value;

    this.setState({
      word_list: items,
    });
  };

  handlePassCountChange = (e) => {
    this.setState({
      pass_count: parseInt(e.target.value),
    });
  };

  goBackPage = () => {
    const history = createHistory();
    history.goBack();
  };

  addRow = () => {
    var list = this.state.word_list.concat({ chinese: "", english: "" });
    this.setState({ word_list: list });
  };

  removeRow = (event) => {
    var idx = event.target.getAttribute("data-idx");
    var temp_list = this.state.word_list;
    temp_list.splice(idx, 1);
    this.setState({ word_list: temp_list });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 p-3">
          <form
            onSubmit={this.onFormSubmit}
            className="general-form rounded"
            onKeyDown={this.handleEnterKey}
          >
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
            <div className="form-group mt-2 table-responsive-sm table-responsive-md">
              <table className="table">
                <thead>
                  <th scope="col">中文</th>
                  <th scope="col">英文</th>
                  <th scope="col"></th>
                </thead>
                <tbody>
                  {this.state.word_list.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            data-idx={idx}
                            value={this.state.word_list[idx].chinese}
                            onChange={this.handleChineseChange}
                            required
                            className="form-control"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            data-idx={idx}
                            value={this.state.word_list[idx].english}
                            onChange={this.handleEnglishChange}
                            className="form-control"
                            required
                          ></input>
                        </td>
                        <td>
                          <button
                            type="button"
                            data-idx={idx}
                            className="btn btn-danger btn-sm"
                            onClick={this.removeRow}
                          >
                            X
                          </button>
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
      </div>
    );
  }
}
