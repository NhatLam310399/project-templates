import { IMongoObjectId } from "typings";

export type IOption =
  | "Email or Dashboard mandatory"
  | "Optional"
  | "Email mandatory"
  | "Email or Dashboard";

export interface ITypeAccount {
  _id?: IMongoObjectId;
  name?: string;
  options?: IOption;
  email?: boolean;
  dashboard?: boolean;
  children?: IChildren[];
}
export interface IChildren {
  name: string;
}
