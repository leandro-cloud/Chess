// import { Board } from "../types/chessboard.d";

// export const knigthMoves = [
//     [-2, -1], [-2, 1],
//     [2, -1], [2, 1],
//     [-1, -2], [-1, 2],
//     [1, -2], [1, 2],
// ]

// export function getPawnMoves(board: Board, row: number, col: number, color: string) {
//     const moves = [];
//     const direction = (color === "white") ? -1 : 1;
//     const startRow = (color === "white") ? 6 : 1;

//     // Movimiento normal
//     const newRow = row + direction;
//     if (isInsideBoard(newRow, col) && !board[newRow][col]) {
//         moves.push([newRow, col]);

//         // Movimiento doble desde la posición inicial
//         const doubleRow = newRow + direction;
//         if (row === startRow && !board[doubleRow][col]) {
//             moves.push([doubleRow, col]);
//         }
//     }

//     // Capturas diagonales
//     for (const newCol of [col - 1, col + 1]) {
//         if (isInsideBoard(newRow, newCol)) {
//             const piece = board[newRow][newCol];
//             if (piece && piece.color !== color) {
//                 moves.push([newRow, newCol]); // Captura
//             }
//         }
//     }

//     return moves;
// }

// function isInsideBoard(row: number, col: number) {
//     return row >= 0 && row < 8 && col >= 0 && col < 8;
// }
