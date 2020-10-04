import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Exercise({ exercise, deleteExercise }) {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + exercise._id}>edit</Link> |{" "}
        <button
          style={{
            border: 0,
            outline: 0,
            display: "inline",
            background: "none",
            padding: 0,
            margin: 0,
            color: "red",
          }}
          onClick={() => {
            deleteExercise(exercise._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
}

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:8000/exercises/" + id)
      .then((response) => console.log(response));
    setExercises(exercises.filter((v) => v._id !== id));
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/exercises/");
        if (response.data.length > 0) {
          setExercises(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const exerciseList = () => {
    return exercises.map((v) => {
      return (
        <Exercise exercise={v} deleteExercise={deleteExercise} key={v._id} />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
