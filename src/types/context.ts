import { Board, Piece } from "./chessboard.d";
import { RemovedPiecesType } from "./color";

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
  pawnPromotion: boolean | [number, number];
  setPawnPromotion: React.Dispatch<
    React.SetStateAction<boolean | [number, number]>
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
  handlePawnPromotion: (piece: string) => void;
}
