import { useBoardContext } from "../hooks/useBoardContext";
import { Square } from "./square";

export function PawnPromotion() {
  const { handlePawnPromotion, turn } = useBoardContext();
  const promotionPieces = [
    { name: "queen", abbr: "Q" },
    { name: "rook", abbr: "R" },
    { name: "bishop", abbr: "B" },
    { name: "knight", abbr: "N" },
  ];

  return (
    <>
      <h2 className="text-ligth-gray text-xl">
        Elige una pieza para intercambiar:
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {promotionPieces.map((piece, index) => (
          <div
            className="flex p-2 justify-center w-[150px] h-[150px] bg-dark-wood border-2 rounded-lg cursor-pointer hover:scale-125"
            key={index}
            onClick={() => handlePawnPromotion(piece)}
          >
            <Square name={piece.name} color={turn} />
          </div>
        ))}
      </div>
    </>
  );
}
