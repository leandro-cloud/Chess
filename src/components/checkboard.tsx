import { type Piece } from "../types/chessboard.d";
import { Square } from "./square";
import { useBoardContext } from "../hooks/useBoardContext";

export function ChessBoard() {
  const { board, updateBoard, turn } = useBoardContext();

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    square: Piece | null,
    rowIndex: number,
    squareIndex: number,
  ) => {
    e.dataTransfer.setData("item", JSON.stringify(square));
    e.dataTransfer.setData("startRowIndex", String(rowIndex));
    e.dataTransfer.setData("startSquare", String(squareIndex));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    endRow: number,
    endSquare: number,
  ) => {
    e.preventDefault();
    const item: Piece | null = JSON.parse(e.dataTransfer.getData("item"));
    const startRow = Number(e.dataTransfer.getData("startRowIndex"));
    const startSquare = Number(e.dataTransfer.getData("startSquare"));

    updateBoard({ item, startRow, startSquare, endRow, endSquare });
  };

  return (
    <>
      {board.map((row, rowIndex) => {
        return (
          <div
            className={`grid grid-cols-8 w-auto row-${rowIndex}`}
            key={rowIndex}
          >
            {row.map((square, squareIndex) => {
              let color: boolean;

              if (rowIndex % 2 === 0 && squareIndex % 2 === 0) {
                color = true;
              } else if (rowIndex % 2 !== 0 && squareIndex % 2 !== 0) {
                color = true;
              } else {
                color = false;
              }

              return (
                <div
                  key={squareIndex}
                  className={`h-[50px] grid grid-rows-8 content-center square-${squareIndex} ${color === true ? "bg-ligth-beige" : "bg-dark-wood"}`}
                >
                  <div
                    className={`flex w-[50px] h-[50px] justify-center items-center z-10 relative ${square?.color == turn && "cursor-pointer"} *:w-[90%] *:h-[90%]`}
                    draggable={square?.color === turn ? true : false}
                    onDragStart={(e) =>
                      handleDragStart(e, square, rowIndex, squareIndex)
                    }
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, rowIndex, squareIndex)}
                  >
                    {square ? (
                      <Square name={square?.name} color={square?.color} />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
