import { type Board, type Piece } from "../types/chessboard.d";
import { checkJump } from "./checkJump";
import { sortIndexes } from "./sortIndexes";

export const checkValidMoves = (
  piece: Piece | null,
  board: Board,
  startRow: number,
  startSquare: number,
  endRow: number,
  endSquare: number,
): boolean => {
  if (!piece) return false;

  if (
    piece?.name === "rook" ||
    piece?.name === "bishop" ||
    piece?.name === "queen" ||
    piece?.name === "pawn"
  ) {
    if (!checkJump(board, startRow, startSquare, endRow, endSquare)) {
      return false;
    }
  }

  // WhitePawn
  if (piece?.name === "pawn" && piece.color === "white") {
    if (
      (startRow === 6 &&
        endRow === startRow - 2 &&
        startSquare === endSquare &&
        board[endRow][endSquare] === null) ||
      (endRow === startRow - 1 &&
        startSquare === endSquare &&
        board[endRow][endSquare] === null) ||
      (endRow === startRow - 1 &&
        (endSquare === startSquare - 1 || endSquare === startSquare + 1) &&
        board[endRow][endSquare]?.color === "black")
    ) {
      return true;
    } else {
      return false;
    }
  }

  // BlackPawn
  if (piece?.name === "pawn" && piece.color === "black") {
    if (
      (startRow === 1 &&
        endRow === startRow + 2 &&
        startSquare === endSquare &&
        board[endRow][endSquare] === null) ||
      (endRow === startRow + 1 &&
        startSquare === endSquare &&
        board[endRow][endSquare] === null) ||
      (endRow === startRow + 1 &&
        (endSquare === startSquare - 1 || endSquare === startSquare + 1) &&
        board[endRow][endSquare]?.color === "white")
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Rook
  if (piece?.name === "rook") {
    if (startRow === endRow || startSquare === endSquare) {
      return true;
    } else {
      return false;
    }
  }

  // bishop
  if (piece?.name === "bishop") {
    const { lowRowIndex, lowSquareIndex, highRowIndex, highSquareIndex } =
      sortIndexes(startRow, endRow, startSquare, endSquare);

    if (highRowIndex - lowRowIndex === highSquareIndex - lowSquareIndex) {
      return true;
    } else {
      return false;
    }
  }

  // Knight
  if (piece?.name === "knight") {
    if (
      (endRow === startRow + 2 && endSquare === startSquare + 1) ||
      (endRow === startRow + 2 && endSquare === startSquare - 1) ||
      (endRow === startRow - 2 && endSquare === startSquare + 1) ||
      (endRow === startRow - 2 && endSquare === startSquare - 1) ||
      (endSquare === startSquare + 2 && endRow === startRow + 1) ||
      (endSquare === startSquare + 2 && endRow === startRow - 1) ||
      (endSquare === startSquare - 2 && endRow === startRow + 1) ||
      (endSquare === startSquare - 2 && endRow === startRow - 1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Queen

  if (piece?.name === "queen") {
    const { lowRowIndex, lowSquareIndex, highRowIndex, highSquareIndex } =
      sortIndexes(startRow, endRow, startSquare, endSquare);

    if (
      startRow === endRow ||
      startSquare === endSquare ||
      highRowIndex - lowRowIndex === highSquareIndex - lowSquareIndex
    ) {
      return true;
    } else {
      return false;
    }
  }

  // King
  if (piece?.name === "king") {
    if (
      // Movimientos horizontales-verticales
      (endSquare === startSquare + 1 && endRow === startRow) ||
      (endSquare === startSquare - 1 && endRow === startRow) ||
      (endSquare === startSquare && endRow === startRow + 1) ||
      (endSquare === startSquare && endRow === startRow - 1) ||
      // Movimientos diagonales
      (endSquare === startSquare + 1 && endRow === startRow + 1) ||
      (endSquare === startSquare - 1 && endRow === startRow - 1) ||
      (endSquare === startSquare + 1 && endRow === startRow - 1) ||
      (endSquare === startSquare - 1 && endRow === startRow + 1)
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
