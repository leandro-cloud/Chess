// Movimiento de una pieza: Qf4  (Dama a f4)
// Movimiento de un peón: b7    (Peón a b7; no lleva letra)

// Captura de pieza: Qxf4       (Dama captura en f4)
// Captura de peón: exd5        (Peón de la columna e captura en d5)

// Jaque: Qf4+                  (Dama da jaque en f4)
// Jaque con peón: b7+          (Peón mueve a b7 y da jaque)
// Captura con jaque: Qxf4+     (Dama captura en f4 y da jaque)
// Captura de peón con jaque: exd5+

// Jaque mate: #                (Ejemplo: Qh7#)

// Promoción: e8=Q              (Peón llega a e8 y se convierte en dama)

// Enroque corto: O-O           (Rey y torre del flanco rey)
// Enroque largo: O-O-O         (Rey y torre del flanco dama)

const columns = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
} as const;

enum symbols {
  catch = "x",
  check = "+",
  checkMate = "#",
  pawnPromotion = "=",
  shortCastling = "o-o",
  longCastling = "o-o-o",
}

export const MovesDictionary = () => {
  const possibleMovesSchema = [
    { turno: 1, blanco: "e4", negro: "e5" },
    { turno: 2, blanco: "Nf3", negro: "Nc6" },
  ];

  return (
    <div className="">
      {possibleMovesSchema.map((move, index) => {
        return (
          <div className="">
            <span>index + 1</span>
            <span>move.pieceName</span>
          </div>
        );
      })}
    </div>
  );
};
