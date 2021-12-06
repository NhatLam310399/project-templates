import { IMongoObjectId, IUser } from "typings";

export interface ILogin {
  user: {
    username: string;
    password: string;
  };
}

export interface IResetPassword {
  email: string;
}
export interface IGetToken {
  data?: { idToken: string };
  loginMethod: "google" | "facebook" | "phone";
}
export interface IDecodeToken {
  exp: number;
  iat?: number;
  id?: string;
}

export interface IAccount {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  userId: {
    id: string;
  };
  userInfo: IUser;
}
