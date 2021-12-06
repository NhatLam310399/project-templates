import { IMongoObjectId, IFilterPlace } from "common/typings";

export interface IGetAllRequest {
  filterRequest?: IFilterPlace;
  page: number;
  size: number;
}

export interface IGetRequestById {
  id: IMongoObjectId;
}

export interface IAcceptRequest {
  id: IMongoObjectId | null;
}

export interface IDeleteRequest {
  id: IMongoObjectId | null;
}
