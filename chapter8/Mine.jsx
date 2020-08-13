import React, { useReducer, createContext, useMemo } from "react";
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
  result: "",
  halted: true,
};

// reducer & action
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.col, action.mine), // 지뢰를 심는 함수
        halted: false,
      };
    case OPEN_CELL: {
      // 기존 테이블데이터 복사
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.OPENED;
      return {
        ...state,
        tableData,
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

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timer, result, tableData, halted } = state;

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
