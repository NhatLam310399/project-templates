import { IUser } from "common/typings";

export interface IGetToken {
  idToken: string | null;
}

export interface IAccount {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  userId?: {
    id?: string;
  };
  userInfo?: IUser;
}

export interface IDecodeToken {
  exp: number;
  iat?: number;
  id?: string;
}
