import { useEffect } from "react";
import "./App.css";
import { ChessBoard } from "./components/checkboard";
import { PawnPromotion } from "./components/PawnPromotion";
import { useBoardContext } from "./hooks/useBoardContext";
import { Turns } from "./components/turns";
import { Check } from "./components/check";
import { CheckMate } from "./components/checkMate";
import { Tie } from "./components/tie";
import { isKingInCheck } from "./utils/isKingInCheck";
import { isCheckMate } from "./utils/isCheckMate";
import { isSlateMate } from "./utils/isSlateMate";
import { RemovedPieces } from "./components/removedPieces";

function App() {
  const {
    board,
    pawnPromotion,
    check,
    checkMate,
    tie,
    setCheck,
    setCheckMate,
    setTie,
    turn,
  } = useBoardContext();

  useEffect(() => {
    const { isCheck, kingPosition, attackPiecePosition } = isKingInCheck(
      board,
      turn,
    );
    if (isCheck) {
      setCheck(true);
      setCheckMate(isCheckMate(board, turn, kingPosition, attackPiecePosition));
    } else {
      setCheck(false);
      setTie(isSlateMate(board, turn));
    }
  }, [turn, board]);

  return (
    <main
      className={
        "w-screen h-screen grid grid-cols-4 items-center bg-violet-800 relative px-3"
      }
    >
      <section
        className="cementery h-screen col-span-1 flex flex-col justify-center py-12 gap-8
        *:border-2 *:border-white *:rounded-xl *:grid-cols-5 *:grid-rows-3 *:h-[180px]"
      >
        <RemovedPieces />
      </section>

      <div className="col-span-2">
        <section>
          <Turns />
        </section>
        <div className="text-white h-4 text-center my-4 font-bold">
          {check && !checkMate && <Check turn={turn} />}
        </div>
        <section
          className={"w-auto h-auto flex flex-col items-center justify-center"}
        >
          <ChessBoard />
        </section>
      </div>

      {checkMate && <CheckMate />}
      {tie && <Tie />}

      <div>
        <section className="w-[150px] h-screen col-span-1"></section>
      </div>

      {pawnPromotion !== false && (
        <section className="flex gap-8 flex-col justify-center items-center bg-black/80 absolute text-center w-[100%] h-[100%] z-20">
          <h2 className="text-white text-xl">
            Elige una pieza para intercambiar:
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <PawnPromotion />
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
