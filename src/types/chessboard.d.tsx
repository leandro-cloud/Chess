type PieceColor = "black" | "white";

export interface Piece {
  name: string;
  color: PieceColor;
  id: string;
  abbr: string;
  hasMoved?: boolean;
}

export type Board = (Piece | null)[][];
