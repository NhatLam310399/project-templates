import { IMongoObjectId } from "@common/typings";

export interface ITypes {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  value?: string;
  slug?: string;
  language?: string;
}
