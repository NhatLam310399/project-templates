import { IMongoObjectId } from "@common/typings";

export interface ITag {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITagInput {
  name?: string;
}

export interface IGetTag {
  filterTag?: ITagInput;
  page?: number;
  size?: number;
}
