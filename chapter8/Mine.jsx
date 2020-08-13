import React, { useReducer, createContext, useMemo, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};
const plantMine = (row, col, mine) => {
  const candidate = Array(row * col)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL); // 기본적으로 노멀 칸
    }
  }
  for (let i = 0; i < shuffle.length; i++) {
    const ver = Math.floor(shuffle[i] / col);
    const hor = shuffle[i] % col;
    data[ver][hor] = CODE.MINE;
  }
  return data;
};

// context api를 사용하기 위해서
export const TableContext = createContext({
  // 기본값(딱히 필요 없으니 모양만 맞춰줌)
  tableData: [],
  dispatch: () => {},
  halted: true,
});

const initialState = {
  tableData: [],
  timer: 0,
  data: {
    row: 0,
    col: 0,
    mine: 0,
  },
  result: "",
  halted: true,
  opendCnt: 0,
};

// reducer & action
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          col: action.col,
          mine: action.mine,
        },
        opendCnt: 0,
        timer: 0,
        tableData: plantMine(action.row, action.col, action.mine), // 지뢰를 심는 함수
        halted: false,
      };
    case OPEN_CELL: {
      // 기존 테이블데이터 복사
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        // 한 칸만이 아닌 모든 칸들을 다 복사
        tableData[i] = [...row];
      });
      const checked = []; //  한 번 연 칸은 다시 열지 않도록 dp의 역할
      let opendCnt = 0;
      // 주변 검사하는 메소드
      const checkAround = (row, col) => {
        // 상하좌우 칸이 아닌 경우 필터링
        if (row < 0 || row >= tableData.length || col < 0 || col >= tableData[0].length) {
          return;
        }
        // 자신이 비어있지 않으면 주변을 열면 안 된다.
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][col])) {
          return;
        }
        if (checked.includes(row + "," + col)) {
          return;
        } else {
          checked.push(row + "," + col);
        }

        let around = [];
        if (tableData[row - 1]) {
          // 위 세 칸이 존재하면 세 칸 넣기
          around = around.concat(tableData[row - 1][col - 1], tableData[row - 1][col], tableData[row - 1][col + 1]);
        }
        around = around.concat(
          // 좌우 넣기
          tableData[row][col - 1],
          tableData[row][col + 1]
        );
        if (tableData[row + 1]) {
          // 아래 세 칸이 존재하면 세 칸 넣기
          around = around.concat(tableData[row + 1][col - 1], tableData[row + 1][col], tableData[row + 1][col + 1]);
        }
        // 좌우 칸이 없는 경우는 filter를 통해서 undefined를 사라지게 하므로 신경 안 써도 된다. 그러나 row가 undefined이면
        // undefined의 col 부분을 찾으려고 해서 오류 난다.
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        if (count === 0) {
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, col - 1]);
            near.push([row - 1, col]);
            near.push([row - 1, col + 1]);
          }
          near.push([row, col - 1]);
          near.push([row, col + 1]);
          if (row + 1 < tableData.length) {
            near.push([row + 1, col - 1]);
            near.push([row + 1, col]);
            near.push([row + 1, col + 1]);
          }
          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) checkAround(n[0], n[1]); // 주변칸이 닫혀있을 때만 연다.
          });
        }
        if (tableData[row][col] === CODE.NORMAL) {
          opendCnt++; // 내 칸이 닫힌 칸이면 카운트 증가
        }
        tableData[row][col] = count;
      };

      checkAround(action.row, action.col);
      let halted = false;
      let result = "";
      console.log(state.data.row * state.data.col - state.data.mine, state.opendCnt, opendCnt);
      if (state.data.row * state.data.col - state.data.mine === state.opendCnt + opendCnt) {
        // 승리
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }

      return {
        ...state,
        tableData,
        halted,
        result,
        opendCnt: state.opendCnt + opendCnt,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.MINE) {
        tableData[action.row][action.col] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.col] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
        tableData[action.row][action.col] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.col] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
        tableData[action.row][action.col] = CODE.MINE;
      } else {
        tableData[action.row][action.col] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER:
      return {
        ...state,
        timer: state.timer + 1,
      };
    default:
      return state;
  }
};
export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
const INCREMENT_TIMER = "INCREMENT_TIMER";

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timer, result, tableData, halted } = state;

  useEffect(() => {
    // 중단이 풀렸을 때 시간 가기 시작
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  // value를 그냥 넘기면 렌더링 시마다 자식 컴포넌트가 새로 렌더링되므로 한 번 캐싱을 해줘야 한다.
  // dispatch는 절대로 바뀔 일이 없다.
  const value = useMemo(() => ({ tableData: tableData, dispatch, halted: halted }), [tableData, halted]);
  return (
    // context api로 접근하고 싶은 데이터들을 provider로 묶어줘야 한다.
    // vlaue로 넘겨줄 데이터를 명시한다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default Mine;
