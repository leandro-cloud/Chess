import { Bishop, King, Knight, Pawn, Queen, Rook } from "../pieces";


export function Square({ name, color }: { name: string, color: string }) {
  switch (name) {
    case "pawn":
      return <Pawn color={color} />
    case "rook":
      return <Rook color={color} />
    case "bishop":
      return <Bishop color={color} />
    case "knight":
      return <Knight color={color} />
    case "queen":
      return <Queen color={color} />
    case "king":
      return <King color={color} />
    default:
      return null
  }
}