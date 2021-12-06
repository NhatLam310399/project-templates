export type IBusinessType = {
  type: "PENDING_COMPANY" | "PENDING_KARAOKE";
  name: string;
};
export const BUSINESS_TYPES: IBusinessType[] = [
  {
    type: "PENDING_KARAOKE",
    name: "Quán Karaoke",
  },
  {
    type: "PENDING_COMPANY",
    name: "Công ty uy tín",
  },
];
