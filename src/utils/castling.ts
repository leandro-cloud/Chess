import { Board, Piece } from "../types/chessboard.d";
import { checkJump } from "./checkJump";
import { isSquareUnderAttack } from "./isSquareUnderAttack";

export const castling = (
  item: Piece,
  board: Board,
  startSquare: number,
  endSquare: number,
  row: number,
  turn: string,
) => {
  const kingPosition = 4;
  const king = board[row][kingPosition];
  let rookPosition: number | null = null;
  let rook: Piece | null = null;

  if (startSquare === 0 || (item.name === "king" && startSquare > endSquare)) {
    rookPosition = 0;
    rook = board[row][0];
  }

  if (startSquare === 7 || (item.name === "king" && startSquare < endSquare)) {
    rookPosition = 7;
    rook = board[row][7];
  }

  if (
    rook === null ||
    rookPosition === null ||
    rook?.hasMoved ||
    king === null ||
    king.hasMoved
  )
    return false;

  const isAllowedMove = checkJump(board, row, rookPosition, row, kingPosition);

  if (!isAllowedMove) {
    return false;
  }

  const castlingDirectionSquares = rookPosition === 0 ? [2, 3] : [5, 6];

  for (let i = 0; i < castlingDirectionSquares.length; i++) {
    const underAttack = isSquareUnderAttack(
      board,
      row,
      castlingDirectionSquares[i],
      turn,
    );
    if (underAttack) return false;
  }

  const newBoard = structuredClone(board);

  if (rookPosition === 0) {
    newBoard[row][castlingDirectionSquares[0]] = king;
    newBoard[row][castlingDirectionSquares[1]] = rook;
  }

  if (rookPosition === 7) {
    newBoard[row][castlingDirectionSquares[0]] = rook;
    newBoard[row][castlingDirectionSquares[1]] = king;
  }

  newBoard[row][kingPosition] = null;
  newBoard[row][rookPosition] = null;

  return newBoard;
};
