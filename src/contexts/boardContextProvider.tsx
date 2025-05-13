import { ReactNode, useState } from "react";
import { CHECKBOARD } from "../constants/checkboard";
import { BoardContext } from "./boardContext";
import { Piece } from "../types/chessboard.d";
import { RemovedPiecesType } from "../types/color";
import { castling } from "../utils/castling";
import { TURNS } from "../constants/turns";
import { checkValidMoves } from "../utils/checkValidMoves";
import { coloneBoard } from "../utils/coloneBoard";
import { updateBoardType } from "../types/context";

const removedPiecesInitialState = {
  black: [],
  white: [],
};

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState(CHECKBOARD);
  const [pawnPromotion, setPawnPromotion] = useState<
    boolean | [number, number]
  >(false);
  const [check, setCheck] = useState(false);
  const [checkMate, setCheckMate] = useState(false);
  const [tie, setTie] = useState(false);
  const [removedPieces, setRemovedPieces] = useState<RemovedPiecesType>(
    removedPiecesInitialState,
  );
  const [turn, setTurn] = useState<"white" | "black">(TURNS.WHITE);
  const [moves, setMoves] = useState([]);

  const updateBoard = ({
    item,
    startRow,
    startSquare,
    endRow,
    endSquare,
  }: updateBoardType) => {
    const endSquareItem = board[endRow][endSquare];

    if (checkMate || tie) return;

    if (item === null) return;

    // Enroque
    if (
      ((item.name === "king" &&
        (endSquare < startSquare - 1 || endSquare > startSquare + 1)) ||
        (item.name === "rook" && board[endRow][endSquare]?.name === "king")) &&
      !check &&
      startRow === endRow
    ) {
      const newBoard = castling(
        item,
        board,
        startSquare,
        endSquare,
        startRow,
        turn,
      );
      if (newBoard == false) return;
      setBoard(newBoard);
      setTurn(turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE);
      return;
    }

    if (
      endSquareItem?.color === turn ||
      endSquareItem?.name === "king" ||
      item?.color !== turn
    ) {
      return;
    }

    if (
      !checkValidMoves(item, board, startRow, startSquare, endRow, endSquare)
    ) {
      return;
    }

    if (
      (item.name === "pawn" && endRow === 0) ||
      (item.name === "pawn" && endRow === 7)
    ) {
      setPawnPromotion([endRow, endSquare]);
    }

    if (item.name === "king" || item.name === "rook") item.hasMoved = true;
    const newBoard = coloneBoard(
      board,
      item,
      turn,
      endRow,
      endSquare,
      startRow,
      startSquare,
    );
    if (!newBoard) return;
    if (endSquareItem !== null) {
      addRemovedPieces(endSquareItem);
    }
    setBoard(newBoard);
    setTurn(turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE);
  };

  const resetGame = () => {
    setBoard(CHECKBOARD);
    setPawnPromotion(false);
    setCheck(false);
    setCheckMate(false);
    setTie(false);
    setRemovedPieces(removedPiecesInitialState);
  };

  const addRemovedPieces = (piece: Piece) => {
    setRemovedPieces((prevPieces) => ({
      ...prevPieces,
      [piece.color]: [...prevPieces[piece.color], piece],
    }));
  };

  const handlePawnPromotion = (piece: string) => {
    const newBoard = structuredClone(board);

    if (!Array.isArray(pawnPromotion) || pawnPromotion.length !== 2) {
      return;
    }

    const [row, col] = pawnPromotion;
    if (row !== null && col !== null && newBoard[row]?.[col]) {
      newBoard[row][col].name = piece;
      setBoard(newBoard);
      setPawnPromotion(false);
      return;
    }
    return;
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        pawnPromotion,
        setPawnPromotion,
        check,
        setCheck,
        checkMate,
        setCheckMate,
        tie,
        setTie,
        resetGame,
        addRemovedPieces,
        removedPieces,
        updateBoard,
        turn,
        handlePawnPromotion,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
