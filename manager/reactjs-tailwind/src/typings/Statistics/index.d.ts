import { IMongoObjectId, IColor } from "typings"
export interface IProductStatistic {
  _id?: IMongoObjectId;
  name?: string;
  createAt?: Date;
  revenue?: number;
  size?: string;
  color?: IColor;
}
