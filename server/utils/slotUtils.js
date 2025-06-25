export const getSlotCountForGroupSize = (size) => {
  if (size === 2) return 1;
  if (size === 3 || size === 4) return 2;
  if (size === 5) return 3;
  return 0;
};