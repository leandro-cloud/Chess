import { useContext } from "react";
import { BoardContext } from "../contexts/boardContext";

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoardContext debe darse dentro de un provider");
  }
  return context;
};
