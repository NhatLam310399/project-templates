/**
 * @description This will help you remove duplicate in array
 * @returns an array
 * @example
 *  input: [
 *   {label: 'Truyền thông', options: 1},
 *   {label: 'Truyền thông', options: 1},
 *   {label: 'Truyền thông', options: 1}
 * ]
 *  output: [{label: 'Truyền thông', options: 1}]
 */

export const removeArrayDuplicate = <T>(array: Array<T>) => {
  return array.filter((item: T, index: number) => {
    const _array = JSON.stringify(item);
    return (
      index ===
      array.findIndex((obj) => {
        return JSON.stringify(obj) === _array;
      })
    );
  });
};
