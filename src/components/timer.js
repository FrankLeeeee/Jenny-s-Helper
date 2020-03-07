import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: props.min,
      seconds: 0
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <button className="btn btn-primary" width="100px">
        {minutes === 0 && seconds === 0 ? (
          <span>时间到！</span>
        ) : (
          <span>
            计时: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        )}
      </button>
    );
  }
}
