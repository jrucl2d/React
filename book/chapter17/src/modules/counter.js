import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const INCREASE = "counter/INCREASE"; // 모듈 이름/액션 이름
const DECREASE = "counter/DECREASE";

// 액션 생성 함수
// export const increase = () => ({ type: INCREASE }); // import {increase, decrease}로 불러옴
// export const decrease = () => ({ type: DECREASE });
export const increase = createAction(INCREASE); // 더 편함
export const decrease = createAction(DECREASE);

// 모듈 초기 상태
const initialState = {
  number: 0,
};

// 리듀서 함수
// const counter = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// };

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter; // import counter로 불러옴
