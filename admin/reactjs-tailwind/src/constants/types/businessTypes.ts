export type IBusinessType = "PENDING_COMPANY" | "PENDING_KARAOKE";

export type IBusiness = {
  type: IBusinessType;
  name: string;
};
export const BUSINESS_TYPES: IBusiness[] = [
  {
    type: "PENDING_KARAOKE",
    name: "Quán Karaoke",
  },
  {
    type: "PENDING_COMPANY",
    name: "Công ty uy tín",
  },
];
