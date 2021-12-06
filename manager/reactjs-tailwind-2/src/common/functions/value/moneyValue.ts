export function renderMoneyValue(value: number) {
  if (value === 0 || !value) {
    return "Null";
  }
  return value.toLocaleString("vi-VN");
}
