import { IMongoObjectId } from "common/typings";

export interface IBusinessType {
  _id?: IMongoObjectId;
  name?: string;
}
