export const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * @example
 *  price = 1500000
 *    --> "1.500.000 ₫";
 */

export const renderPrice = (price = 0, sign = "₫"): string => {
  const formattedPrice = numberWithCommas(price);
  let result;

  if (sign === "vnd") result = `${formattedPrice} ${sign}`;
  else result = `${formattedPrice}${sign}`;

  return result;
};
