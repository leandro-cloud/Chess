import { Board } from "../types/chessboard.d";

export const findKing = (board: Board, color: string) => {
  // ubicar la posicion del rey

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        board[row][col]?.name === "king" &&
        board[row][col]?.color === color
      ) {
        return [row, col];
      }
    }
  }

  return null;
};
