export interface IDiscountType {
  _id: string;
  name: string;
  value: "percent" | "value";
}
export const discountType: IDiscountType[] = [
  {
    _id: "1",
    name: "Giảm theo phần trăm",
    value: "percent",
  },
  {
    _id: "2",
    name: "Giảm theo tiền",
    value: "value",
  },
];
