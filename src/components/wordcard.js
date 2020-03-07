import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class WordCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;

    return (
      <div className="p-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">{question}</h5>
            <input type="text" className="w-100"></input>
          </div>
        </div>
      </div>
    );
  }
}
