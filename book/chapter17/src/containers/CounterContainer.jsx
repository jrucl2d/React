import React, { useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};
export default CounterContainer;

/// 이 아래로 이전 내용

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
// export default connect((state) => ({ number: state.counter.number }), {
//   increase,
//   decrease,
// })(CounterContainer);
