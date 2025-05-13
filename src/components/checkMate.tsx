import { TURNS } from "../constants/turns";
import { useBoardContext } from "../hooks/useBoardContext";
import { King } from "../pieces";

export const CheckMate = () => {
  const { resetGame, turn } = useBoardContext();

  return (
    <section className="flex gap-8 flex-col justify-center items-center bg-black/80 absolute text-center w-full h-full z-20">
      <h1 className="text-white text-lg font-bold">Winner:</h1>
      <div className="flex p-2 justify-center w-[150px] h-[150px] bg-gray-400 border-2 rounded-lg">
        <King color={turn === "white" ? TURNS.BLACK : TURNS.WHITE} />
      </div>
      <div>
        <button
          className="text-white font-semibold bg-sky-600 hover:bg-sky-700 p-3 border-2 border-black rounded-lg"
          onClick={resetGame}
        >
          Play again
        </button>
      </div>
    </section>
  );
};
