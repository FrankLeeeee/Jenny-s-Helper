import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import WordCard from "../components/wordcard";
import toast from "../toast/toast";

export default class StudentResultPage extends Component {
  constructor(props) {
    super(props);
    let task_id = this.props.match.params.task_id;
    let user_id = this.props.match.params.user_id;

    this.state = {
      user_id: user_id,
      task_id: task_id,
      word_list: [],
    };
  }

  componentWillMount = () => {
    // if the dictation is completed, fetch student's answers as well
    var url = `http://47.74.186.167:8080/word/completion?user_id=${this.state.user_id}&task_id=${this.state.task_id}`;

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
              english: item.english,
              chinese: item.chinese,
            };
          });

          var answers = {};
          if (res.subjects.submission != null) {
            for (var i = 0; i < res.subjects.submission[0].answer.length; i++) {
              var item = res.subjects.submission[0].answer[i];
              answers[item.word_id] = item.student_answer;
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

          this.setState({
            word_list: word_list,
          });
        } else {
          toast.error("获取听写作业失败");
        }
      });
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
    console.log(this.state);
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
            studentAnswer={this.state.word_list[idx].student_answer}
            question={this.state.word_list[idx].chinese}
            handleAnswerChange={this.handleAnswerChange}
            idx={idx}
            correct={correct}
            readonly="true"
          />
        </div>
      );
    });
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
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.props.history.goBack}
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
      </div>
    );
  }
}
