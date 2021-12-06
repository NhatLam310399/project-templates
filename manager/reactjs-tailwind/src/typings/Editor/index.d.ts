import { IColor } from "common/constants/editor";

export * from "./Controller";

export type ITemplateDesigned = {
  front?: string;
  back?: string;
  colors: IColor[];
};
