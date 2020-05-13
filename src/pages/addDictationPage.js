import React, { Component } from "react";
import Navbar from "../components/navbar";
import AddQuizForm from "../components/addQuizForm";

export default class AddDictationPage extends Component {
  render() {
    return (
      <div>
        {/**  */}
        <Navbar />
        <AddQuizForm />
      </div>
    );
  }
}
