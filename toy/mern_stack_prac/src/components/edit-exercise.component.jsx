import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EditExercises({ match }) {
  const [exerciseInfo, setExerciseInfo] = useState({
    username: "",
    desc: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
  const userInput = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/exercises/" + match.params.id
        );
        const response = await axios.get("http://localhost:8000/users/");
        if (response.data.length > 0) {
          setExerciseInfo({
            username: res.data.username,
            desc: res.data.desc,
            duration: res.data.duration,
            date: new Date(res.data.date),
            users: response.data.map((user) => user.username),
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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

    axios
      .put(
        "http://localhost:8000/exercises/update/" + match.params.id,
        exerciseInfo
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  };

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
            {exerciseInfo &&
              exerciseInfo.users &&
              exerciseInfo.users.map(function (user) {
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

export default EditExercises;
