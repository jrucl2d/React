import React, { useState } from "react";
import axios from "axios";

function CreateUsers() {
  const [userInfo, setUserInfo] = useState({
    username: "",
  });

  const onChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);

    axios
      .post("http://localhost:8000/users/add", userInfo)
      .then((res) => console.log(res.data));

    setUserInfo({
      username: "",
    });
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            name="username"
            className="form-control"
            value={userInfo.username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUsers;
