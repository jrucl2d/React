import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); // DOM 이벤트로 등록되면서 메서드와 this의 관계가 끊어짐
    this.handleClick = this.handleClick.bind(this); // 따라서 this를 바인딩해줘야 함. 안 그러면 undefined가 나옴
  }
  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }
  handleClick() {
    alert(this.state.message);
    this.setState({ message: "" });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력하시오"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
export default EventPractice;
