import { Piece } from "./chessboard.d";

export type pawnPromotionType = {
  item: Piece;
  endRow: number;
  endSquare: number;
  startRow: number;
  startSquare: number;
};
