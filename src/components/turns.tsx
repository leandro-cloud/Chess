import { useBoardContext } from "../hooks/useBoardContext";
import { King } from "../pieces";

export const Turns = () => {
  const { turn } = useBoardContext();
  const bgColor = turn === "white" ? "black" : "white";

  return (
    <div className="h-10 flex justify-center text-white text-center font-bold gap-4">
      <h2 className="text-xl text-center">Turn:</h2>
      <div
        className={`h-10 w-10 flex justify-center bg-${bgColor} border-2 rounded border${turn}`}
      >
        <King color={turn} />
      </div>
    </div>
  );
};
