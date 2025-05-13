export const sortIndexes = (startRow: number, endRow: number, startSquare: number, endSquare: number) => {
    let lowRowIndex = startRow
    let lowSquareIndex = startSquare
    let highRowIndex = endRow
    let highSquareIndex = endSquare


    if (startRow > endRow) {
        lowRowIndex = endRow
        highRowIndex = startRow
    }

    if (startSquare > endSquare) {
        lowSquareIndex = endSquare
        highSquareIndex = startSquare
    }

    return { lowRowIndex, lowSquareIndex, highRowIndex, highSquareIndex }
}