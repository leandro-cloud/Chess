import { Board, Piece } from "./chessboard.d";
import { RemovedPiecesType } from "./color";
import { pawnPromotionType } from "./pawnPromotionType.d";

export interface updateBoardType {
  item: Piece | null;
  startRow: number;
  startSquare: number;
  endRow: number;
  endSquare: number;
}

export interface BoardContextType {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  pawnPromotion: boolean | pawnPromotionType;
  setPawnPromotion: React.Dispatch<
    React.SetStateAction<boolean | pawnPromotionType>
  >;
  check: boolean;
  tie: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setTie: React.Dispatch<React.SetStateAction<boolean>>;
  checkMate: boolean;
  setCheckMate: React.Dispatch<React.SetStateAction<boolean>>;
  resetGame: () => void;
  addRemovedPieces: (piece: Piece) => void;
  removedPieces: RemovedPiecesType;
  updateBoard: ({
    item,
    startRow,
    startSquare,
    endRow,
    endSquare,
  }: updateBoardType) => void;
  turn: "white" | "black";
  handlePawnPromotion: (piece: { name: string; abbr: string }) => void;
  moves: {
    black: string[];
    white: string[];
  };
}
