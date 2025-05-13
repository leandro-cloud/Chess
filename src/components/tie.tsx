import { useBoardContext } from "../hooks/useBoardContext";

export const Tie = () => {
  const { resetGame } = useBoardContext();
  return (
    <section className="flex flex-col gap-8 justify-center items-center bg-black/80 absolute text-center w-full h-full z-20">
      <h1 className="text-white text-2xl font-bold">Empate!!!</h1>
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
