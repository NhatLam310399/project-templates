import { IPermissionType } from "@constants/permission";
import { IUser } from "../Users";
import { IMongoObjectId } from "./GraphQL";

export interface IAccount {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  userInfo: IUser;
}
