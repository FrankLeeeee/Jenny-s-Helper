import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import WordCard from "../components/wordcard";
import toast from "../toast/toast";
import { createBrowserHistory as createHistory } from "history";

export default class DictationPage extends Component {
  constructor(props) {
    super(props);
    let task_id = this.props.match.params.task_id;

    if (this.props.match.params.user_id) {
      var user_id = this.props.match.params.user_id;
    } else {
      var user_id = window.localStorage.user_id;
    }
    let completed = this.props.completed;

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
      this.loadStateIfCompleted();
    }

    // if not completed, only fetch the questions
    else {
      this.loadStateIfUncompleted();
    }
  };

  loadStateIfCompleted = () => {
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
            for (var i = 0; i < res.subjects.submission[0].answer.length; i++) {
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
          toast.error("获取听写作业失败");
        }
      });
  };

  loadStateIfUncompleted = () => {
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
          console.log(this.state);
        } else {
          toast.error("获取听写作业失败");
        }
      });
  };

  handleEnterKey = (e) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
      if (this.props.showHighlight) {
        if (item.english == item.student_answer) {
          var color = "success";
        } else {
          var color = "danger";
        }
      } else {
        var color = "dark";
      }

      return (
        <div className="col-sm-6 col-md-3 col-lg-2" key={idx}>
          <WordCard
            question={this.state.word_list[idx].chinese}
            studentAnswer={this.state.word_list[idx].student_answer}
            handleAnswerChange={this.handleAnswerChange}
            idx={idx}
            color={color}
            readOnly={this.props.readOnly}
          />
        </div>
      );
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      return null;
    }

    var word_list = this.state.word_list.map((item) => {
      return {
        id: item.word_id,
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
            // this.props.history.push("/student/dictation/submission");
          } else {
            toast.warning("提交作业成功，但未及格。");
          }
        } else {
          toast.error("提交作业失败");
        }
      });
  };

  backToHome = () => {
    const history = createHistory();
    history.goBack();
  };

  goToResubmit = () => {
    this.props.history.push(
      `/student/dictation/uncompleted/${this.state.task_id}`
    );
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-4 shadow-lg bg-white rounded">
          <div className="text-center pt-3">
            <h3>听写</h3>
          </div>
          <form onSubmit={this.onFormSubmit} onKeyDown={this.handleEnterKey}>
            <div className="container pl-3 pr-3">
              <div className="form-row">{this.createCards()}</div>
            </div>
            <div className="form-row">
              <div className="col d-flex justify-content-center">
                <div>
                  <button
                    className="btn btn-primary m-3"
                    type="button"
                    onClick={this.backToHome}
                  >
                    返回
                  </button>
                  {this.props.allowSubmit && (
                    <button className="btn btn-success m-3" type="submit">
                      提交
                    </button>
                  )}
                  {this.props.showResubmitButton && (
                    <button
                      className="btn btn-success m-3"
                      type="submit"
                      onClick={this.goToResubmit}
                    >
                      重新提交
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
