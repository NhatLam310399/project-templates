import { IMongoObjectId, IOption } from "typings";

export interface ITypeOrderProduct {
  _id?: IMongoObjectId;
  name?: string;
  options?: IOption;
  email?: boolean;
  dashboard?: boolean;
  app?: boolean;
  children?: IChildren[];
}
export interface IChildren {
  name?: string;
}
