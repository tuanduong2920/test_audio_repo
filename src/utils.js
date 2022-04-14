export const formatSecond = (second) => {
  return new Date(second * 1000).toISOString().substr(11, 12);
};
