import React from "react";
import DatePicker from "react-datepicker";
import { createBrowserHistory as createHistory } from "history";
import toast from "../toast/toast";
import utils from "../utils";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import api_caller from "../api_caller";

export default class AddQuizForm extends React.Component {
  state = {
    date: new Date(),
    word_list: [],
    sentence_list: [],
    pass_count: 0,
  };

  handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  handlePassCountChange = (event) => {
    this.setState({
      pass_count: parseInt(event.target.value),
    });
  };

  goBackPage = () => {
    const history = createHistory();
    history.goBack();
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    if (utils.earlier_than_today(this.state.date)) {
      toast.error("无效日期，听写日期应该大于等于今天日期");
    } else if (
      this.state.pass_count > this.state.word_list.length ||
      this.state.pass_count < 0
    ) {
      toast.error("及格题数不能大于总题数或者为负");
    } else if (
      this.state.word_list.length == 0 &&
      this.state.sentence_list.length == 0
    ) {
      toast.error("没有添加听写内容");
    } else {
      var { date, pass_coutn, word_list, sentence_list } = this.state;
      api_caller
        .add_quiz(date, pass_coutn, word_list, sentence_list)
        .then((res) => {
          if (res == true) {
            this.props.history.push("/teacher/addDictation/success");
          } else {
            toast.error("网络出错啦");
          }
        });
    }
  };

  addRow = (event) => {
    var data_type = event.target.getAttribute("data-for");

    if (data_type == "word") {
      var list = this.state.word_list.concat({ chinese: "", english: "" });
      this.setState({ word_list: list });
    } else {
      var list = this.state.sentence_list.concat({ chinese: "", english: "" });
      this.setState({ sentence_list: list });
    }
  };

  removeRow = (event) => {
    var idx = event.target.getAttribute("data-idx");
    var data_type = event.target.getAttribute("data-for");

    if (data_type == "word") {
      var temp_list = this.state.word_list;
      temp_list.splice(idx, 1);
      this.setState({ word_list: temp_list });
    } else {
      var temp_list = this.state.sentence_list;
      temp_list.splice(idx, 1);
      this.setState({ sentence_list: temp_list });
    }
  };

  handleChineseChange = (event) => {
    var idx = event.target.getAttribute("data-idx");
    var data_type = event.target.getAttribute("data-for");

    if (data_type == "word") {
      var items = this.state.word_list;
      items[idx].chinese = event.target.value;

      this.setState({
        word_list: items,
      });
    } else {
      var items = this.state.sentence_list;
      items[idx].chinese = event.target.value;

      this.setState({
        sentence_list: items,
      });
    }
  };

  handleEnglishChange = (event) => {
    var idx = event.target.getAttribute("data-idx");
    var data_type = event.target.getAttribute("data-for");

    if (data_type == "word") {
      var items = this.state.word_list;
      items[idx].english = event.target.value;

      this.setState({
        word_list: items,
      });
    } else {
      var items = this.state.sentence_list;
      items[idx].english = event.target.value;

      this.setState({
        sentence_list: items,
      });
    }
  };

  render() {
    return (
      <div className="container mt-5 p-3">
        <form
          onSubmit={this.onFormSubmit}
          className="general-form rounded"
          onKeyDown={this.handleEnterKey}
        >
          {/* Title */}
          <h4 className="text-center">添加听写</h4>

          {/* First row to set date and pass count */}
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

          {/* Dynamic table to add words */}
          <div className="fluid-container">
            <div className="row">
              <div className="col">
                <label>单词列表</label>
                <button
                  type="button"
                  data-for="word"
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
                            data-for="word"
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
                            data-for="word"
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
                            data-for="word"
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
          </div>

          {/* Dynamic table to add words */}
          <div className="fluid-container">
            <div className="row">
              <div className="col">
                <label>句子列表</label>
                <button
                  type="button"
                  data-for="sentence"
                  onClick={this.addRow}
                  className="btn btn-sm btn-primary float-right"
                >
                  添加句子
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
                  {this.state.sentence_list.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            data-idx={idx}
                            data-for="sentence"
                            value={this.state.sentence_list[idx].chinese}
                            onChange={this.handleChineseChange}
                            required
                            className="form-control"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            data-idx={idx}
                            data-for="sentence"
                            value={this.state.sentence_list[idx].english}
                            onChange={this.handleEnglishChange}
                            className="form-control"
                            required
                          ></input>
                        </td>
                        <td>
                          <button
                            type="button"
                            data-idx={idx}
                            data-for="sentence"
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
          </div>

          {/* form buttons */}
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
    );
  }
}
