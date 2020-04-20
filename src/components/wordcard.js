import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class WordCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;

    return (
      <div className="p-3 form-group">
        <div className="card">
          <div className="card-body">
            <h5 className={`card-title text-center text-${this.props.color}`}>
              {question}
            </h5>
            <input
              type="text"
              className={`w-100 form-control border border-${this.props.color}`}
              onChange={this.props.handleAnswerChange}
              data-idx={this.props.idx}
              value={this.props.studentAnswer}
              required
              readOnly={this.props.readOnly}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
