import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  // 기본적으로 렌더링되고 난 직후마다 실행됨
  useEffect(() => {
    // console.log("렌더링이 완료되었습니다");
    // console.log("마운트 될 때만 실행됩니다");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  }, []);

  return (
    <>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <b>이름:</b> {name}
      </div>
      <div>
        <b>닉네임:</b> {nickname}
      </div>
    </>
  );
};
export default Info;
