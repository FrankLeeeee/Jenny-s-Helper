import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/app.css";
import Navbar from "../components/navbar";
import WordCard from "../components/wordcard";
import Timer from "../components/timer";

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
      <div className="col-sm-6 col-md-4 col-lg-2">
        <WordCard key={idx} question={item} />
      </div>
    ));
  };

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="fluid-container pl-3 pr-3">
          <div className="row">
            <div className="col">
              <div className="float-left">
                <Timer min={3} />
              </div>
              <div className="float-right">
                <button class="btn btn-success">开始</button>
              </div>
            </div>
          </div>
          <div className="row">{this.createCards()}</div>
        </div>
      </div>
    );
  }
}
