import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import DictationCard from "../components/dictationCard";
import toast from "../toast/toast";
import { createBrowserHistory as createHistory } from "history";
import api_caller from "../api_caller";

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
      sentence_list: [],
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

  loadStudentAnswer = (list, submission = null) => {
    if (submission != null && submission.length > 0) {
      var answers = submission[0].answer;
      var answer_dict = {};

      for (let i = 0; i < answers.length; i++) {
        answer_dict[answers[i].word_id] = answers[i].student_answer;
      }

      list = list.map((item) => {
        if (answer_dict.hasOwnProperty(item.word_id)) {
          item.student_answer = answer_dict[item.word_id];
        } else {
          item.student_answer = "";
        }
        return item;
      });
    } else {
      list = list.map((item) => {
        item.student_answer = "";
        return item;
      });
    }

    return list;
  };

  loadStateIfCompleted = () => {
    api_caller
      .fetch_student_results(this.state.user_id, this.state.task_id)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          var word_list = res.subjects.word_list.filter(
            (item) => item.type == "word"
          );
          var sentence_list = res.subjects.word_list.filter(
            (item) => item.type == "sentence"
          );

          word_list = this.loadStudentAnswer(
            word_list,
            res.subjects.submission
          );

          sentence_list = this.loadStudentAnswer(
            sentence_list,
            res.subjects.submission
          );

          console.log(sentence_list);

          this.setState({
            word_list: word_list,
            sentence_list: sentence_list,
          });
        } else {
          toast.error("获取听写作业失败");
        }
      });
  };

  loadStateIfUncompleted = () => {
    api_caller
      .fetch_quiz(this.state.task_id)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          var word_list = res.subjects.word_list.filter(
            (item) => item.type == "word"
          );
          var sentence_list = res.subjects.word_list.filter(
            (item) => item.type == "sentence"
          );

          word_list = this.loadStudentAnswer(word_list);
          sentence_list = this.loadStudentAnswer(sentence_list);

          this.setState({
            word_list: word_list,
            sentence_list: sentence_list,
          });
        } else {
          toast.error("获取听写作业失败");
        }
      });
  };

  handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  handleAnswerChange = (event) => {
    var idx = event.target.getAttribute("data-idx");
    var type = event.target.getAttribute("data-type");

    if (type == "word") {
      var items = this.state.word_list;
    } else if (type == "sentence") {
      var items = this.state.sentence_list;
    }
    items[idx].student_answer = event.target.value;

    if (type == "word") {
      this.setState({
        word_list: items,
      });
    } else if (type == "sentence") {
      this.setState({
        sentence_list: items,
      });
    }
  };

  createCards = (list, type) => {
    if (type == "word") {
      var size = "col-sm-6 col-md-3 col-lg-2";
    } else if ((type = "sentence")) {
      var size = "col-sm-12 col-md-12 col-lg-6";
    }

    return list.map((item, idx) => {
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
        <div className={size} key={idx}>
          <DictationCard
            question={list[idx].chinese}
            studentAnswer={list[idx].student_answer}
            handleAnswerChange={this.handleAnswerChange}
            idx={idx}
            color={color}
            type={type}
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

    api_caller
      .submit_quiz_results(
        this.state.task_id,
        this.state.word_list,
        this.state.sentence_list
      )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (res.subjects.pass) {
            this.props.history.push("/student/dictation/submission");
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
              {this.state.word_list.length > 0 && (
                <h5 className="ml-3">单词</h5>
              )}
              <div className="form-row">
                {this.createCards(this.state.word_list, "word")}
              </div>
              {this.state.sentence_list.length > 0 && (
                <h5 className="ml-3">句子</h5>
              )}
              <div className="form-row">
                {this.createCards(this.state.sentence_list, "sentence")}
              </div>
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
                      type="button"
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
