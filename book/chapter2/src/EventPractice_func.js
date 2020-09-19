import React, { useState } from "react";

const EventPractice_func = () => {
  //   const [username, setUsername] = useState("");
  //   const [message, setMessage] = useState("");
  //   const onChangeUsername = (e) => setUsername(e.target.value);
  //   const onChangeMessage = (e) => setMessage(e.target.value);
  //   const onClick = () => {
  //     alert(username + ":" + message);
  //     setUsername("");
  //     setMessage("");
  //   };
  //   const onKeyPress = (e) => {
  //     if (e.key === "Enter") {
  //       onClick();
  //     }
  //   };
  const [form, setForm] = useState({
    username: "",
    message: "",
  });
  const { username, message } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form, // 기존의 form 내용을 복사
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };
  const onClick = () => {
    alert(username + ":" + message);
    setForm({ username: "", message: "" });
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력하시오"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice_func;
