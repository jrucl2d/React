import React, { useReducer, createContext, useMemo } from "react";
import Table from "./Table";

const initialState = {
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  winner: "",
  turn: "O",
};

// Context API
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

// action
export const SET_CELL = "SET_CELL";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CELL: {
      console.log(action.row, action.col);
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = state.turn;
      return {
        ...state,
        tableData,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    default:
      return;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner } = state;

  const value = useMemo(() => ({ tableData, dispatch }), [tableData]);
  return (
    <TableContext.Provider value={value}>
      <Table />
      {winner && <div>{winner}가 승리했습니다!</div>}
    </TableContext.Provider>
  );
};

export default TicTacToe;
