import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import WordCard from "../components/wordcard";

export default class DictationPage extends Component {
  constructor() {
    super();
    this.questions_list = [
      "前所未有",
      "毫无疑问",
      "无论如何",
      "不可思议",
      "不可避免",
      "众所周知",
      "有感而发",
      "实实在在",
      "全力以赴",
      "各种各样",
      "一如既往",
      "实事求是"
    ];
  }

  createCards = () => {
    return this.questions_list.map((item, idx) => (
      <div className="col-sm-6 col-md-6 col-lg-4">
        <WordCard key={idx} question={item} />
      </div>
    ));
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="fluid-container pl-3 pr-3 mt-3 mb-3">
          <div className="row">
            <div className="col">
              <div className="float-right pr-3">
                <button class="btn btn-success">提交</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container pl-3 pr-3">
          <div className="row">{this.createCards()}</div>
        </div>
      </div>
    );
  }
}
