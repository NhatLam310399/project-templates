export const getAllStringValuesOfObject = <T>(obj: T): string[] => {
  if (!obj) return [];
  const values: string[] = [];
  for (const key in obj) {
    const currValue = obj[key];
    if (typeof currValue === "string") values.push(currValue);
    else if (typeof currValue === "object")
      values.push(...getAllStringValuesOfObject(currValue));
  }
  return values;
};
