import { IMongoObjectId } from "common/typings";
import { IProvince } from "../Location";
import { IUser } from "../Users";

export interface IGetToken {
  idToken: string | null;
}
export interface IDecodeToken {
  exp: number;
  iat?: number;
  id?: string;
}
