import { Board } from "../types/chessboard.d";
import { checkValidMoves } from "./checkValidMoves";

export const isSquareUnderAttack = (
  board: Board,
  endRow: number,
  endCol: number,
  color: string,
) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] !== null && board[row][col]?.color !== color) {
        if (checkValidMoves(board[row][col], board, row, col, endRow, endCol)) {
          return true;
        }
      }
    }
  }

  return false;
};
