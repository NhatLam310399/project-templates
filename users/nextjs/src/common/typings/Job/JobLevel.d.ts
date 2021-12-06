import { IMongoObjectId } from "../App";

export interface IJobLevel {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  keywords?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
