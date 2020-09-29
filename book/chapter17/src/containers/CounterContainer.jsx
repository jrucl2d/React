import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
const mapStateToProps = (state) => ({
  number: state.counter.number,
});

// 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
const mapDispatchToProps = (dispatch) =>
  // {
  //   // 임시 함수
  //   increase: () => {
  //     return dispatch(increase());
  //   },
  //   decrease: () => {
  //     return dispatch(decrease());
  //   },
  // }

  // redux 안의 아래 유틸 함수 사용해도 됨
  bindActionCreators(
    {
      increase,
      decrease,
    },
    dispatch
  );

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

// 한 번에 써도 되며, 액션 생성 함수를 객체로 보내면 알아서 내부에서 bindActionCreators를 해줌
export default connect((state) => ({ number: state.counter.number }), {
  increase,
  decrease,
})(CounterContainer);
