
export const renderPriceTypeDollar = (price: number) => {
  if (price === 0 || price === null) return "$0";
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const newPrice = formatter.format(price);
  return newPrice;
}