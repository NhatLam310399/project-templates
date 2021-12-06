import { IMongoObjectId, IUser } from "@common/typings";

export interface IRating {
  _id?: IMongoObjectId;
  user?: IUser;
  rate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetRatingByUserId {
  userId: string;
}
