import { CASTLING_TYPE } from "../constants/castlingTypes";
import { Piece } from "./chessboard.d";

export type CastlingType = (typeof CASTLING_TYPE)[keyof typeof CASTLING_TYPE];

export interface CastlingInfo {
  check: boolean;
  checkMate: boolean;
  pawnPromotion: boolean;
  castling: string;
  endSquareItem: null | Piece;
}
