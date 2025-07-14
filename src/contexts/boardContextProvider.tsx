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
import { checkMoveResult } from "../utils/checkMoveResult";
import { pawnPromotionType } from "../types/pawnPromotionType.d";
import { makeMoveAbbr } from "../utils/makeMoveAbbr";
import { DictionaryType } from "../types/dictionary";

const removedPiecesInitialState = {
  black: [],
  white: [],
};

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState(CHECKBOARD);
  const [pawnPromotion, setPawnPromotion] = useState<
    pawnPromotionType | boolean
  >(false);
  const [check, setCheck] = useState(false);
  const [checkMate, setCheckMate] = useState(false);
  const [tie, setTie] = useState(false);
  const [removedPieces, setRemovedPieces] = useState<RemovedPiecesType>(
    removedPiecesInitialState,
  );
  const [turn, setTurn] = useState<"white" | "black">(TURNS.WHITE);
  const [moves, setMoves] = useState({ black: [], white: [] });

  const updateBoard = ({
    item,
    startRow,
    startSquare,
    endRow,
    endSquare,
  }: updateBoardType) => {
    const endSquareItem = board[endRow][endSquare];

    const moveDictionary: DictionaryType = {
      item,
      check: false,
      checkMate: false,
      pawnPromotion,
      castling: null,
      startRow,
      endRow,
      endSquare,
      endSquareItem,
    };

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
      const { newBoard, castlingType } = castling(
        item,
        board,
        startSquare,
        endSquare,
        startRow,
        turn,
      );
      if (newBoard == null) return;
      setBoard(newBoard);
      setTurn(turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE);
      moveDictionary.castling = castlingType;
      makeMoveAbbr(moveDictionary);
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

    if (item.name === "king" || item.name === "rook") item.hasMoved = true;

    // Pawn promotion
    if (
      (item.name === "pawn" && endRow === 0) ||
      (item.name === "pawn" && endRow === 7)
    ) {
      setPawnPromotion({
        item,
        endRow,
        endSquare,
        startRow,
        startSquare,
      });
      return;
    }

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
    const opponent = turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE;
    setTurn(turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE);
    const { isCheck, isCheckMate, isTie } = checkMoveResult(newBoard, opponent);
    if (isCheck) {
      setCheck(isCheck);
      moveDictionary.check = isCheck;
      if (isCheckMate) {
        setCheckMate(isCheckMate);
        moveDictionary.checkMate = isCheckMate;
        makeMoveAbbr(moveDictionary);
        return;
      }
    } else {
      setCheck(false);
    }
    if (setTie) setTie(isTie);

    const newMoveToDicc = makeMoveAbbr(moveDictionary);
    setMoves((prevMoves) => ({
      ...prevMoves,
      [turn]: [...prevMoves[turn], newMoveToDicc],
    }));
  };

  const resetGame = () => {
    setBoard(CHECKBOARD);
    setPawnPromotion(false);
    setCheck(false);
    setCheckMate(false);
    setTie(false);
    setRemovedPieces(removedPiecesInitialState);
    setTurn(TURNS.WHITE);
    setMoves({ black: [], white: [] });
  };

  const addRemovedPieces = (piece: Piece) => {
    setRemovedPieces((prevPieces) => ({
      ...prevPieces,
      [piece.color]: [...prevPieces[piece.color], piece],
    }));
  };

  const handlePawnPromotion = (piece: { name: string; abbr: string }) => {
    if (pawnPromotion && typeof pawnPromotion !== "boolean") {
      const { item, endRow, endSquare, startRow, startSquare } = pawnPromotion;

      const moveDictionary: DictionaryType = {
        item: { ...item },
        check,
        checkMate,
        pawnPromotion,
        castling: null,
        startRow,
        endRow,
        endSquare,
        endSquareItem: board[endRow][endSquare],
        promotionPieceAbbr: piece.abbr,
      };

      console.log(moveDictionary);

      item.name = piece.name;
      item.abbr = piece.abbr;

      const newBoard = structuredClone(board);
      newBoard[endRow][endSquare] = item;
      newBoard[startRow][startSquare] = null;
      setBoard(newBoard);
      setPawnPromotion(false);
      const opponent = turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE;
      setTurn(turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE);
      const { isCheck, isCheckMate, isTie } = checkMoveResult(
        newBoard,
        opponent,
      );
      if (isCheck) {
        setCheck(isCheck);
        moveDictionary.check = isCheck;
        if (isCheckMate) {
          setCheckMate(isCheckMate);
          moveDictionary.checkMate = isCheckMate;
          makeMoveAbbr(moveDictionary);
          return;
        }
      } else {
        setCheck(false);
      }
      if (setTie) setTie(isTie);
      makeMoveAbbr(moveDictionary);
    }
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
        moves,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
