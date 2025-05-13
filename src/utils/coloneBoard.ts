import { Board, Piece } from "../types/chessboard.d";
import { isKingInCheck } from "./isKingInCheck";

export const coloneBoard = (
  board: Board,
  item: Piece,
  turn: string,
  rowIndex: number,
  squareIndex: number,
  startRow: number,
  startSquare: number,
) => {
  const newBoard = structuredClone(board);
  newBoard[rowIndex][squareIndex] = item;
  newBoard[startRow][startSquare] = null;
  const { isCheck } = isKingInCheck(newBoard, turn);
  if (isCheck) return false;

  return newBoard;
};
