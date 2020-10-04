import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercises() {
  const [exerciseInfo, setExerciseInfo] = useState({
    username: "",
    desc: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
  const userInput = useRef(null);

  const onChange = (e) => {
    setExerciseInfo({
      ...exerciseInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeDate = (date) => {
    setExerciseInfo({
      ...exerciseInfo,
      date,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(exerciseInfo);
    window.location = "/";
  };

  useEffect(() => {
    setExerciseInfo({
      ...exerciseInfo,
      users: ["test user", "test user2"],
      username: "test user",
    });
  }, []);

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            name="username"
            ref={userInput}
            required
            className="form-control"
            value={exerciseInfo.username}
            onChange={onChange}
          >
            {exerciseInfo.users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            name="desc"
            type="text"
            required
            className="form-control"
            value={exerciseInfo.desc}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={exerciseInfo.duration}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exerciseInfo.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercises;
