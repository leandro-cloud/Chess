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
//
// Necesito:
// 1. nombre de la pieza
// 2. casilla a la que se mueve
// 3. que movimiento fue.
//
// movimientos:
// 1. moviminto solo: abreviacion (no para el peon) + columna + fila
// 2. captura: abreviacion (no para el peon) + x + columna + fila
// 3. Jaque: abreviacion (no para el peon) + columna + fila + +
// 4. Jaque mate: abreviacion (no para el peon) + columna + fila + #
// 5. Promocion: columna + fila + = + abreviatura
// 6. enroque corto: o-o
// entoque largo: o-o-o
//
// para ello:
// 1. saber si hay Captura
// 2. saber si hay Jaque
// 3. saber si hay jaquemate
// 4. saber si hay Enroque
// 5, saber si hay promocion

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
  const possibleMovesSchema = {
    white: [
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
    ],
    black: [
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "Qe4",
      "g2",
      "Bxf4",
      "Qxd2",
      "e8=Q",
      "e8=Q",
      "e8=Q",
    ],
  };

  const { white, black } = possibleMovesSchema;

  const maxLength = Math.max(white.length, black.length);

  return (
    <table>
      <thead>
        <tr>
          <th className="border border-gray-400 px-2 py-1">#</th>
          <th className="border border-gray-400 px-2 py-1">White</th>
          <th className="border border-gray-400 px-2 py-1">Black</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxLength }).map((_, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-500" : "bg-white"}
          >
            <td className="border border-gray-400 px-2 py-1">{index + 1}</td>
            <td className="border border-gray-400 px-2 py-1">
              {white[index] || ""}
            </td>
            <td className="border border-gray-400 px-2 py-1">
              {black[index] || ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
