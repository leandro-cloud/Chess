import { Piece } from "../types/chessboard.d";

const columns = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
} as const;

enum symbols {
  catch = "x",
  check = "+",
  checkMate = "#",
  pawnPromotion = "=",
  shortCastling = "o-o",
  longCastling = "o-o-o",
}

export const makeMove = (
  piece: Piece,
  row: number,
  square: number,
  finalSquare: Piece | null,
) => {
  const move = "";
};
