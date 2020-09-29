// 액션 타입 정의
const INCREASE = "counter/INCREASE"; // 모듈 이름/액션 이름
const DECREASE = "counter/DECREASE";

// 액션 생성 함수
export const increase = () => ({ type: INCREASE }); // import {increase, decrease}로 불러옴
export const decrease = () => ({ type: DECREASE });

// 모듈 초기 상태
const initialState = {
  number: 0,
};

// 리듀서 함수
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

export default counter; // import counter로 불러옴
