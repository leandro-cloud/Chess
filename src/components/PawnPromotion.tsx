import { useBoardContext } from "../hooks/useBoardContext";
import { Square } from "./square";

export function PawnPromotion() {
  const { handlePawnPromotion, turn } = useBoardContext();
  const promotionPieces = [
    { name: "Queen", abbr: "Q" },
    { name: "Rook", abbr: "R" },
    { name: "Bishop", abbr: "B" },
    { name: "knight", abbr: "N" },
  ];

  return (
    <>
      {promotionPieces.map((piece, index) => (
        <div
          className="flex p-2 justify-center w-[150px] h-[150px] bg-gray-400 border-2 cursor-pointer hover:scale-125"
          key={index}
          onClick={() => handlePawnPromotion(piece)}
        >
          <Square name={piece.name} color={turn} />
        </div>
      ))}
    </>
  );
}
