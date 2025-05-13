import { Piece } from "./chessboard.d";

export interface Color {
  color: string;
}

export type RemovedPiecesType = {
  white: Piece[];
  black: Piece[];
};

export type RemovedPiecesColorsType = Record<"white" | "black", string[]>;
