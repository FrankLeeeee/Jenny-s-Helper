import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import WordCard from "../components/wordcard";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import queryString from "query-string";

export default class DictationPage extends Component {
  constructor(props) {
    super(props);
    let completed =
      queryString.parse(props.location.search).completed == "true";
    let task_id = this.props.match.params.task_id;
    let user_id = window.localStorage.user_id;

    this.state = {
      user_id: user_id,
      task_id: task_id,
      word_list: [],
      completed: completed,
    };
  }

  componentWillMount = () => {
    // if the dictation is completed, fetch student's answers as well
    if (this.state.completed) {
      var url = `http://localhost:8000/word/completion?user_id=${this.state.user_id}&task_id=${this.state.task_id}`;

      fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            var word_list = res.subjects.word_list.map((item) => {
              return {
                word_id: item.word_id,
                chinese: item.chinese,
                english: item.english,
              };
            });

            var answers = {};
            if (res.subjects.submission != null) {
              for (
                var i = 0;
                i < res.subjects.submission[0].answer.length;
                i++
              ) {
                var answer = res.subjects.submission[0].answer[i];
                answers[answer.word_id] = answer.student_answer;
              }
            }
            word_list = word_list.map((item) => {
              var word_id = item.word_id;

              if (answers.hasOwnProperty(word_id)) {
                item["student_answer"] = answers[word_id];
              } else {
                item["student_answer"] = "";
              }
              return item;
            });

            console.log(word_list);
            this.setState({
              word_list: word_list,
            });
            console.log(this.state);
          } else {
            NotificationManager.error("获取听写作业失败", "Error", 3000);
          }
        });
    }
    // if not completed, only fetch the questions
    else {
      var url = `http://localhost:8000/student/quiz/get?task_id=${this.state.task_id}`;
      fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.setState({
              word_list: res.subjects.word_list.map((item) => {
                return {
                  word_id: item.word_id,
                  chinese: item.chinese,
                  student_answer: "",
                };
              }),
            });
          } else {
            NotificationManager.error("获取听写作业失败", "Error", 3000);
          }
        });
    }
  };

  handleAnswerChange = (e) => {
    var idx = e.target.getAttribute("data-idx");
    var items = this.state.word_list;
    items[idx].student_answer = e.target.value;

    this.setState({
      word_list: items,
    });
  };

  createCards = () => {
    return this.state.word_list.map((item, idx) => {
      if (
        item.hasOwnProperty("english") &&
        item.hasOwnProperty("student_answer")
      ) {
        if (item.english == item.student_answer) {
          var correct = 1;
        } else {
          var correct = 0;
        }
      } else {
        var correct = -1;
      }

      return (
        <div className="col-sm-6 col-md-6 col-lg-4" key={idx}>
          <WordCard
            question={this.state.word_list[idx].chinese}
            studentAnswer={this.state.word_list[idx].student_answer}
            handleAnswerChange={this.handleAnswerChange}
            idx={idx}
            correct={correct}
          />
        </div>
      );
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    var word_list = this.state.word_list.map((item) => {
      return {
        id: item.id,
        student_answer: item.student_answer,
      };
    });

    fetch("http://localhost:8000/student/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
      body: JSON.stringify({
        task_id: this.state.task_id,
        word_list: word_list,
      }),
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          if (res.subjects.pass) {
            NotificationManager.success(
              "提交作业成功，已及格，正在返回首页",
              "Success",
              3000
            );
            setTimeout(this.backToHome, 3000);
          } else {
            NotificationManager.warning(
              "提交作业成功，但未及格",
              "Warning",
              3000
            );
          }
        } else {
          NotificationManager.error("提交作业失败", "Error", 3000);
        }
      });
  };

  backToHome = () => {
    this.props.history.push("/student/home");
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="fluid-container pl-3 pr-3 mt-3 mb-3">
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="col">
                <div className="float-right pr-3">
                  <button className="btn btn-success" type="submit">
                    提交
                  </button>
                </div>
                <div className="float-right pr-3">
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

            <div className="container pl-3 pr-3">
              <div className="row">{this.createCards()}</div>
            </div>
          </form>
        </div>
        <div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}
