import { createContext } from "react";
import { BoardContextType } from "../types/context";

export const BoardContext = createContext<BoardContextType | null>(null);
