/**
 *  @description Give me ward, district and province, I'll give you magic
 *  @example
 *    - ward: "Linh Trung"
 *    - district: undefine
 *    - province: "Ho Chi Minh"
 *  --> "Linh Trung, Ho Chi, Minh"
 */

export const renderLocation = (array: (string | undefined)[]): string => {
  const location: (string | undefined)[] = [];
  array.map(item => {
    if (item) location.push(item);
  });
  return location.join(", ");
};
