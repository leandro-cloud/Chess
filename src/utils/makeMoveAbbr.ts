import { symbols } from "../constants/abbrs";
import { CASTLING_TYPE } from "../constants/castlingTypes";
import { DictionaryType } from "../types/dictionary";
import { getColumnFromNumber } from "./getColumnFromMumber";

export const makeMoveAbbr = (moveDictionary: DictionaryType) => {
  let moveAbbr = "";

  const {
    item,
    check,
    checkMate,
    pawnPromotion,
    castling,
    startRow,
    endRow,
    endSquare,
    endSquareItem,
    promotionPieceAbbr,
  } = moveDictionary;

  if (castling !== null) {
    if (castling === CASTLING_TYPE.LONG) {
      moveAbbr = symbols.longCastling;
    } else if (castling === CASTLING_TYPE.SHORT) {
      moveAbbr = symbols.shortCastling;
    }
    return moveAbbr;
  }

  if (endSquareItem !== null) {
    const itemAbbr =
      item?.name == "pawn" ? getColumnFromNumber(startRow) : item?.abbr;
    moveAbbr =
      itemAbbr + symbols.catch + getColumnFromNumber(endRow) + (endSquare + 1);
  }

  if (endSquareItem === null) {
    moveAbbr = item?.abbr + getColumnFromNumber(endRow) + (endSquare + 1);
  }

  if (pawnPromotion) {
    moveAbbr = moveAbbr + symbols.pawnPromotion + promotionPieceAbbr;
  }

  if (check && !checkMate) {
    moveAbbr = moveAbbr + symbols.check;
  }

  if (checkMate) {
    moveAbbr = moveAbbr + symbols.checkMate;
  }

  console.log(moveAbbr);

  return moveAbbr;
};
