import { type Board } from "../types/chessboard.d";
import { isValidPosition } from "./isValidPosition";
import { sortIndexes } from "./sortIndexes";

export const checkJump = (
  board: Board,
  startRow: number,
  startSquare: number,
  endRow: number,
  endSquare: number,
) => {
  const { lowRowIndex, lowSquareIndex, highRowIndex, highSquareIndex } =
    sortIndexes(startRow, endRow, startSquare, endSquare);

  let allowed = true;

  // Misma fila
  if (lowRowIndex === highRowIndex) {
    for (let i = highSquareIndex - 1; i > lowSquareIndex; i--) {
      if (board[lowRowIndex][i] !== null) {
        allowed = false;
        break;
      }
    }
  }

  // Misma columna
  if (lowSquareIndex === highSquareIndex) {
    for (let i = highRowIndex - 1; i > lowRowIndex; i--) {
      if (board[i][lowSquareIndex] !== null) {
        allowed = false;
        break;
      }
    }
  }

  // Movimientos diagonales
  if (highRowIndex - lowRowIndex === highSquareIndex - lowSquareIndex) {
    const stepX = startRow < endRow ? 1 : -1;
    const stepY = startSquare < endSquare ? 1 : -1;

    let x = startRow;
    let y = startSquare;

    while (
      isValidPosition(x + stepX, y + stepY) &&
      x + stepX != endRow &&
      y + stepY != endSquare
    ) {
      x += stepX;
      y += stepY;
      if (
        board[x][y] !== null &&
        x !== endRow + stepX &&
        y !== endSquare + stepY
      ) {
        allowed = false;
        break;
      }
    }
  }

  return allowed;
};
