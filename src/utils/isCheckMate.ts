import { type Board } from "../types/chessboard.d";
import { checkValidMoves } from "./checkValidMoves";
import { isKingInCheck } from "./isKingInCheck";
import { isSquareUnderAttack } from "./isSquareUnderAttack";
import { isValidPosition } from "./isValidPosition";

export const isCheckMate = (
  board: Board,
  color: string,
  kingPosition: number[] | null,
  attackPiecePosition: number[] | null,
): boolean => {
  // 1. Revisar si el rey tiene movimientos validos

  if (kingPosition == null) {
    return false;
  }

  if (!attackPiecePosition) {
    return false;
  }

  const [attackPiecePositionX, attackPiecePositionY] = attackPiecePosition;

  const [kingRow, kingCol] = kingPosition;

  if (
    checkValidMoves(
      board[kingRow][kingCol],
      board,
      kingRow,
      kingCol,
      attackPiecePositionX,
      attackPiecePositionY,
    )
  ) {
    return false;
  }

  const kingMoves = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, 0],
    [1, -1],
    [1, 1],
  ];

  for (const [dx, dy] of kingMoves) {
    const newRow = kingRow + dx;
    const newCol = kingCol + dy;
    if (
      isValidPosition(newRow, newCol) &&
      (!board[newRow][newCol] || board[newRow][newCol]?.color !== color) &&
      !isSquareUnderAttack(board, newRow, newCol, color)
    ) {
      return false; // Si el rey puede moverse a una casilla segura, no es jaque mate
    }
  }

  // Revisar si alguna pieza aliada puede capturar la pieza atacante o bloquear el jaque
  // Tener la posicion de la pieza que hace haque.

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        board[row][col]?.color === color &&
        board[row][col]?.name !== "king" &&
        checkValidMoves(
          board[row][col],
          board,
          row,
          col,
          attackPiecePositionX,
          attackPiecePositionY,
        )
      ) {
        return false;
      }
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        board[row][col]?.color === color &&
        board[row][col]?.name !== "king"
      ) {
        const piece = board[row][col];
        for (let goRow = 0; goRow < board.length; goRow++) {
          for (let goCol = 0; goCol < board[goRow].length; goCol++) {
            const square = board[goRow][goCol];
            if (square === null) {
              const isValidMove = checkValidMoves(
                piece,
                board,
                row,
                col,
                goRow,
                goCol,
              );
              if (isValidMove) {
                const newBoard = structuredClone(board);
                newBoard[row][col] = null;
                newBoard[goRow][goCol] = piece;
                const { isCheck } = isKingInCheck(newBoard, color);
                if (!isCheck) {
                  return false;
                }
              }
            }
          }
        }
      }
    }
  }

  return true;
};
