import React from "react";
import Value from "./Value";
import Control from "./Control";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

function Counter({ number, color, increment, decrement, setColor }) {
  const setRandomColor = () => {
    const color = [
      Math.floor(Math.random() * 55 + 200),
      Math.floor(Math.random() * 55 + 200),
      Math.floor(Math.random() * 55 + 200),
    ];
    setColor(color);
  };

  const style = {
    background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
  };
  return (
    <div style={style}>
      <Value number={number} />
      <Control
        color={color}
        onPlus={increment}
        onSub={decrement}
        onRandom={setRandomColor}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    number: state.counter.number,
    color: state.color.color,
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Counter);
