import "./App.css";
import { ChessBoard } from "./components/checkboard";
import { PawnPromotion } from "./components/PawnPromotion";
import { useBoardContext } from "./hooks/useBoardContext";
import { Turns } from "./components/turns";
import { Check } from "./components/check";
import { CheckMate } from "./components/checkMate";
import { Tie } from "./components/tie";
import { RemovedPieces } from "./components/removedPieces";
import { MovesDictionary } from "./components/movesDictionary";

function App() {
  const { pawnPromotion, check, checkMate, tie, turn } = useBoardContext();

  return (
    <main
      className={
        "w-screen h-screen flex flex-col justify-center place-items-center bg-carbon-gray relative"
      }
    >
      <div className="h-full">
        <section className="h-fit w-full mt-1">
          <Turns />
          <div className="text-white h-4 text-center my-4 font-bold">
            {check && !checkMate && <Check turn={turn} />}
          </div>
        </section>

        <div className="w-full grid grid-cols-[1fr_auto_1fr] gap-6">
          <section
            className="flex flex-col w-full gap-8 justify-evenly
            *:border-2 *:border-white *:bg-[#2e2e2e] *:rounded-md"
          >
            <RemovedPieces />
          </section>

          <section className="w-auto h-auto flex flex-col">
            <ChessBoard />
          </section>

          <section className="overflow-auto w-fit h-fit max-h-[400px] border-2 border-white">
            <MovesDictionary />
          </section>
        </div>
      </div>
      {checkMate && <CheckMate />}
      {tie && <Tie />}
      {pawnPromotion !== false && (
        <section className="flex gap-8 flex-col justify-center items-center bg-black/80 absolute text-center w-[100%] h-[100%] z-20">
          <PawnPromotion />
        </section>
      )}
    </main>
  );
}

export default App;
