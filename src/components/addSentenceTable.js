import React from "react";

export default class AddSentenceTable extends React.Component {
  state = {
    quiz_content: [],
  };

  handleChineseChange = (e) => {
    var key = e.target.getAttribute("data-idx");
    var items = this.state.quiz_content;
    items[key].chinese = e.target.value;

    this.setState({
      quiz_content: items,
    });
  };

  handleEnglishChange = (e) => {
    var key = e.target.getAttribute("data-idx");
    var items = this.state.quiz_content;
    items[key].english = e.target.value;

    this.setState({
      quiz_content: items,
    });
  };

  addRow = () => {
    var list = this.state.quiz_content.concat({ chinese: "", english: "" });
    this.setState({ quiz_content: list });
  };

  removeRow = (event) => {
    var idx = event.target.getAttribute("data-idx");
    var temp_list = this.state.quiz_content;
    temp_list.splice(idx, 1);
    this.setState({ quiz_content: temp_list });
  };

  render() {
    return (
      <div className="fluid-container">
        <div className="row">
          <div className="col">
            <label>句子列表</label>
            <button
              type="button"
              onClick={this.addRow}
              className="btn btn-sm btn-primary float-right"
            >
              添加句子
            </button>
          </div>
        </div>
        <div className="form-group mt-2 table-responsive-sm table-responsive-md">
          <table className="table">
            <thead>
              <th scope="col">类型</th>
              <th scope="col">内容</th>
              <th scope="col"></th>
            </thead>
            <tbody>
              {this.state.quiz_content.map((item, idx) => {
                return (
                  <div key={idx}>
                    <tr>
                      <td>中文</td>
                      <td>
                        <input
                          type="text"
                          data-idx={idx}
                          value={this.state.quiz_content[idx].chinese}
                          onChange={this.handleChineseChange}
                          required
                          className="form-control"
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          data-idx={idx}
                          value={this.state.quiz_content[idx].english}
                          onChange={this.handleEnglishChange}
                          className="form-control"
                          required
                        ></input>
                      </td>
                      <td>
                        <button
                          type="button"
                          data-idx={idx}
                          className="btn btn-danger btn-sm"
                          onClick={this.removeRow}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </div>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
