import { useBoardContext } from "../hooks/useBoardContext";
import { Square } from "./square";

export function PawnPromotion() {
  const { handlePawnPromotion, turn } = useBoardContext();
  const promotionPieces = ["queen", "rook", "bishop", "knight"];

  // Mejorar esto
  const color = turn == "white" ? "black" : "white";
  return (
    <>
      {promotionPieces.map((piece, index) => (
        <div
          className="flex p-2 justify-center w-[150px] h-[150px] bg-gray-400 border-2 cursor-pointer hover:scale-125"
          key={index}
          onClick={() => handlePawnPromotion(piece)}
        >
          <Square name={piece} color={color} />
        </div>
      ))}
    </>
  );
}
