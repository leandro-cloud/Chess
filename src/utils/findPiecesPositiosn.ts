import { Board } from "../types/chessboard.d";
import { checkValidMoves } from "./checkValidMoves";

export const findPiecesPositions = (board: Board, color: string, kingPosition: number[]) => {

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] != null && board[row][col]?.color === color) {
                return checkValidMoves(board[row][col], board, row, col, kingPosition[0], kingPosition[1])
            }
        }
    }
}