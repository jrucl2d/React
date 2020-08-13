import React, { useReducer, createContext, useMemo, useEffect } from "react";
import Table from "./Table";

const initialState = {
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  winner: "",
  turn: "O",
  recentCell: [-1, -1],
};

// Context API
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

// action
export const SET_CELL = "SET_CELL";
const CHANGE_TURN = "CHANGE_TURN";
const WIN_GAME = "WIN_GAME";
const RESET_GAME = "RESET_GAME";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.col],
      };
    }
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
        winner: "",
      };
    case WIN_GAME:
      return {
        ...state,
        winner: action.winner,
      };
    case RESET_GAME:
      return {
        ...state,
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        turn: "O",
        recentCell: [-1, -1],
      };
    default:
      return;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, recentCell, turn } = state;

  useEffect(() => {
    const [row, col] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if (win) {
      console.log(tableData);
      dispatch({ type: WIN_GAME, winner: turn });
      dispatch({ type: RESET_GAME });
      return;
    }
    // 무승부
    let done = true;
    tableData.forEach((row) => {
      row.forEach((col) => {
        if (!col) done = false;
      });
    });
    if (done) {
      dispatch({ type: WIN_GAME, winner: "무승부잼이" });
      dispatch({ type: RESET_GAME });
      return;
    }
    dispatch({ type: CHANGE_TURN });
  }, [tableData]);

  const value = useMemo(() => ({ tableData, dispatch, winner }), [tableData]);
  return (
    <TableContext.Provider value={value}>
      <Table />
      {winner && <div>{winner}가 승리했습니다!</div>}
    </TableContext.Provider>
  );
};

export default TicTacToe;
