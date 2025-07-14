import { useBoardContext } from "../hooks/useBoardContext";
import { Square } from "./square";

export const RemovedPieces = () => {
  const { removedPieces } = useBoardContext();
  const { black, white } = removedPieces;
  return (
    <>
      <div className="flex flex-wrap min-h-[50px] w-full items-center p-2 gap-y-2">
        {white.map((piece, index) => {
          return (
            <div
              key={index}
              className="h-[30px] w-[30px] *:w-[100%] *:h-[100%]"
            >
              <Square name={piece.name} color={piece.color} />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap min-h-[50px] items-center py-2 gap-y-2">
        {black.map((piece, index) => {
          return (
            <div
              key={index}
              className="h-[30px] w-[30px] *:w-[100%] *:h-[100%]"
            >
              <Square name={piece.name} color={piece.color} />
            </div>
          );
        })}
      </div>
    </>
  );
};
