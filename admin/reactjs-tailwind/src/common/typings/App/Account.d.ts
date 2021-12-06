import { IUser } from "common/typings";

export interface IAccount {
  accessToken: string;
  token: string;
  refreshToken: string;
  userInfo: IUser;
}
