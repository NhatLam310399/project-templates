import { IMongoObjectId } from "typings";
export interface IFilterFile {
  _id: IMongoObjectId;
  name?: string;
}
