export const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * @example
 *  price = 1500000
 *    --> "1.500.000 ₫";
 */
export const renderPrice = (price: number): string => {
  if (!price) return "0 vnđ";
  const formattedPrice = numberWithCommas(price);
  const result = `${formattedPrice} vnđ`;
  return result;
};
