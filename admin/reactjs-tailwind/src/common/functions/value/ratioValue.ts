export function renderRatioValue(value: number) {
  if (value === 0 || !value) {
    return "Null";
  }
  return `${value * 100}%`;
}
