import * as types from "../actions/ActionTypes";

const initialState = {
  color: [255, 255, 255],
};

export default function counter(state = initialState, action) {
  if (action.type === types.SET_COLOR) {
    return {
      color: action.color,
    };
  } else {
    return state;
  }
}
