import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class WordCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;

    if (this.props.correct == 1) {
      var color = "text-success";
    } else if (this.props.correct == 0) {
      var color = "text-danger";
    } else {
      var color = "text-dark";
    }

    return (
      <div className="p-3 form-group">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">{question}</h5>
            <input
              type="text"
              className={`w-100 form-control ${color}`}
              onChange={this.props.handleAnswerChange}
              data-idx={this.props.idx}
              value={this.props.studentAnswer}
              required
              readOnly={this.props.readonly == "true"}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
