import { useBoardContext } from "../hooks/useBoardContext";
import { King } from "../pieces";

export const Turns = () => {
  const { turn } = useBoardContext();

  return (
    <div className="h-10 flex justify-center text-ligth-gray text-center font-bold gap-4">
      <h2 className="text-xl text-center">Turn:</h2>
      <div className="h-10 w-10 p-[2px] flex justify-center bg-dark-wood rounded-sm">
        <King color={turn} />
      </div>
    </div>
  );
};
