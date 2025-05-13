import { Board } from "../types/chessboard.d";
import { checkValidMoves } from "./checkValidMoves";

export const isSlateMate = (board: Board, color: string) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        board[row][col]?.color === color &&
        board[row][col]?.name !== "king"
      ) {
        const piece = board[row][col];
        for (let goRow = 0; goRow < board.length; goRow++) {
          for (let goCol = 0; goCol < board[goRow].length; goCol++) {
            const isValidMove = checkValidMoves(
              piece,
              board,
              row,
              col,
              goRow,
              goCol,
            );
            if (isValidMove) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
};
