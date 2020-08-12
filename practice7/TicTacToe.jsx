import React, { useReducer, useCallback, useEffect } from "react";
import Table from "./Table";

// TicTacToe -> Table -> Tr -> Td
// 실제로 클릭하는 것은 Td인데, 데이터를 관리하는 곳은 바로 TicTacToe이다. 따라서 이 간극을 줄이기 위해서 ContextAPI를 사용한다.
// state 개수가 너무 많으면 관리가 힘들기 때문에 useReducer을 사용한다.

const initialState = {
  winner: "",
  turn: "o",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1], // 최근 누른 셀을 기억
};

// 디스패치 안의 객체가 action 객체가 되고 dispatch가 액션을 실행한다. 이 액션을 해석해서 state를 바꿔주는 역할을 바로 reducer가 한다.
// reducer은 함수인데, 뭔가를 줄이는 역할.
const reducer = (state, action) => {
  switch (action.type) {
    // state.winner = action.winner로 직접 바꾸면 안 됨! 불변성을 위해서. 기존 state를 직접 바꾸지 않고 새로운 state를 만들어서 바뀔 부분만 바꿔주는.
    case SET_WINNER:
      return {
        ...state, // action.type 기존 state도 얕은 복사를 해줘야 한다.
        winner: action.winner, // action.winner
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; // 기존의 테이블 데이터를 얕은 복사 해줌
      tableData[action.row] = [...tableData[action.row]]; // row도 얕은 복사를 해줘야 함. immer라는 라이브러리로 가독성 문제 해결
      tableData[action.row][action.cell] = state.turn; // 해당 부분을 turn으로 바꿔줌
      return {
        ...state,
        tableData, // tableData: tableData, 이름이 같아서 줄임
        recentCell: [action.row, action.cell],
      };
    }
    case SET_TURN: {
      return {
        ...state,
        turn: state.turn === "o" ? "x" : "o",
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "o",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

// action의 이름은 따로 빼서 관리하는게 좋고, 대문자로 하는 것이 국룰.
// 모듈로 만들어서 하위 Td 컴포넌트에서 사용해야 하므로
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
const SET_TURN = "SET_TURN";
const RESET_GAME = "RESET_GAME";

const TicTacToe = () => {
  // 세 번째 인자는 lazy initialize라고 지연 초기화라고 한다. 그러나 거의 안 쓴다. 복잡해져야 쓴다.
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // tableData가 바뀌었을 때 완료인지를 파악해야 한다. dispatch가 비동기이기 때문에 useEffect로 파악!! 중요!!
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    } // 처음 실행될 때도 useEffect가 실행되므로 초기값 -1에 대해서 return을 해버린다.
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if (win) {
      // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      // 테이블 다 찼는지 검사
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) all = false;
        });
      });
      if (all) {
        // 무승부라면
        dispatch({ type: RESET_GAME });
      }
      dispatch({ type: SET_TURN }); // 승리 검사하고 이긴게 아니면 턴을 교체
    }
  }, [recentCell]); // 클릭한 셀이 바뀔 때마다

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리!</div>}
    </>
  );
};

export default TicTacToe;
