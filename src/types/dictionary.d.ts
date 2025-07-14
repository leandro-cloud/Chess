import { CastlingType } from "./castling";
import { Piece } from "./chessboard.d";
import { pawnPromotionType } from "./pawnPromotionType.d";

type DictionaryType = {
  item?: Piece | null;
  check: boolean;
  checkMate: boolean;
  pawnPromotion: pawnPromotionType | boolean;
  castling: CastlingType | null;
  startRow: number;
  endRow: number;
  endSquare: number;
  endSquareItem: Piece | null;
  promotionPieceAbbr?: string;
};
