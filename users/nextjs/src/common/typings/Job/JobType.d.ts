import { IMongoObjectId } from "../App";

export interface IJobType {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  keywords?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFilterJobType {
  name?: string;
}

export interface IGetAllJobType {
  filterJobType?: IFilterJobType;
  page?: number;
  size?: number;
}
