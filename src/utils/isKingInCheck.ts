import { type Board } from "../types/chessboard.d";
import { checkValidMoves } from "./checkValidMoves";
import { findKing } from "./findKing";

export const isKingInCheck = (board: Board, color: string) => {
  const kingPosition = findKing(board, color);

  if (!kingPosition)
    return { isCheck: false, kingPosition: null, attackPiecePosition: null };
  const [kingRow, kingCol] = kingPosition;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const piece = board[row][col];
      if (piece !== null && board[row][col]?.color !== color) {
        if (checkValidMoves(piece, board, row, col, kingRow, kingCol)) {
          return {
            isCheck: true,
            kingPosition: kingPosition,
            attackPiecePosition: [row, col],
          };
        }
      }
    }
  }

  return { isCheck: false, kingPosition: null, attackPiecePosition: null };
};
