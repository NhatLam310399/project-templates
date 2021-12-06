export const renderLocation = (array: (string | undefined)[]): string => {
  const location: (string | undefined)[] = [];
  array.map(item => {
    if (item) location.push(item);
  });
  return location.join(", ");
};
