import { IMongoObjectId, IPlace, IUser, ISortType } from "common/typings";

export interface IRating {
  _id?: IMongoObjectId;
  user?: IUser;
  place?: IPlace;
  rate?: number;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRatingCreateInput {
  user?: string;
  place?: string;
  rate?: number;
  content?: string;
}

export interface ICreateRating {
  RatingCreateInput: IRatingCreateInput;
}

export interface IRatingUpdateInput {
  rate?: number;
  content?: string;
}

export interface IUpdateRating {
  id: string;
  RatingUpdateInput: IRatingUpdateInput;
}

export interface IFilterRating {
  sortType?: ISortType;
  rate?: number;
  place?: string;
  user?: string;
}

export interface IGetAllRating {
  filterRating?: IFilterRating;
  page?: number;
  size?: number;
}
