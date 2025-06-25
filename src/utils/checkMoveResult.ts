import { Board } from "../types/chessboard.d";
import { isCheckMate } from "./isCheckMate";
import { isKingInCheck } from "./isKingInCheck";
import { isSlateMate } from "./isSlateMate";

export const checkMoveResult = (newBoard: Board, opponent: string) => {
  const { isCheck, kingPosition, attackPiecePosition } = isKingInCheck(
    newBoard,
    opponent,
  );

  if (isCheck) {
    return {
      isCheck,
      isCheckMate: isCheckMate(
        newBoard,
        opponent,
        kingPosition,
        attackPiecePosition,
      ),
      isTie: false,
    };
  } else {
    return {
      isCheck,
      isCheckMate: false,
      isTie: isSlateMate(newBoard, opponent),
    };
  }
};
