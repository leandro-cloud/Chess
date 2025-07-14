import { columns } from "../constants/abbrs";

export const getColumnFromNumber = (columnNumber: number) => {
  return columns[columnNumber];
};
