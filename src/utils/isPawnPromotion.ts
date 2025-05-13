export const isPawnPromotion = (endRow: number) => {
  if (endRow === 0 || endRow === 7) {
    return true;
  }
};
