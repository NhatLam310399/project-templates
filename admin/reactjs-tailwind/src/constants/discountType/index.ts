export interface IDiscountType {
  _id: string;
  name: string;
  type: "percent" | "value";
}
export const discountType: IDiscountType[] = [
  {
    _id: "1",
    name: "Phần trăm giá dịch vụ",
    type: "percent",
  },
  {
    _id: "2",
    name: "Giảm theo giá tiền",
    type: "value",
  },
];
