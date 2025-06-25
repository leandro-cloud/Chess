import { useBoardContext } from "../hooks/useBoardContext";
import { Square } from "./square";

export const RemovedPieces = () => {
  const { removedPieces } = useBoardContext();
  const { black, white } = removedPieces;
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(45px,_1fr))] min-h-[118px] items-center py-2 gap-y-2">
        {white.map((piece, index) => {
          return (
            <div
              key={index}
              className="h-[45px] w-[45px] *:w-[100%] *:h-[100%]"
            >
              <Square name={piece.name} color={piece.color} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(45px,_1fr))] min-h-[118px] items-center py-2 gap-y-2">
        {black.map((piece, index) => {
          return (
            <div
              key={index}
              className="h-[45px] w-[45px] *:w-[100%] *:h-[100%]"
            >
              <Square name={piece.name} color={piece.color} />
            </div>
          );
        })}
      </div>
    </>
  );
};
