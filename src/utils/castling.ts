import { CASTLING_TYPE } from "../constants/castlingTypes";
import { CastlingType } from "../types/castling.d";
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

  let castlingType: CastlingType | null = null;

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
    return { newBoard: null, castlingType };

  const isAllowedMove = checkJump(board, row, rookPosition, row, kingPosition);

  if (!isAllowedMove) {
    return { newBoard: null, castlingType };
  }

  const castlingDirectionSquares = rookPosition === 0 ? [2, 3] : [5, 6];

  for (let i = 0; i < castlingDirectionSquares.length; i++) {
    const underAttack = isSquareUnderAttack(
      board,
      row,
      castlingDirectionSquares[i],
      turn,
    );
    if (underAttack) {
      return { newBoard: null, castlingType };
    }
  }

  const newBoard = structuredClone(board);

  if (rookPosition === 0) {
    newBoard[row][castlingDirectionSquares[0]] = king;
    newBoard[row][castlingDirectionSquares[1]] = rook;
    castlingType = CASTLING_TYPE.LONG;
  }

  if (rookPosition === 7) {
    newBoard[row][castlingDirectionSquares[0]] = rook;
    newBoard[row][castlingDirectionSquares[1]] = king;
    castlingType = CASTLING_TYPE.SHORT;
  }

  newBoard[row][kingPosition] = null;
  newBoard[row][rookPosition] = null;

  return { newBoard, castlingType };
};
