export const getBetweenDay = (dateFrom: Date, dateTo: Date) => {
  const differenceInTime = dateTo.getTime() - dateFrom.getTime();
  const differenceInDay = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDay;
};
