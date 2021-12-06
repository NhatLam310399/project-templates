import { IMongoObjectId, IUser } from "@common/typings";

export interface IGetToken {
  data?: { idToken: string };
  loginMethod: "google" | "facebook" | "zalo" | "phone";
}
export interface IDecodeToken {
  exp: number;
  iat?: number;
  id?: string;
}

export interface IAuth {
  accessToken?: string;
  refreshToken?: string;
  userInfo?: IUser;
}
export interface ILoginInput {
  user: {
    username: string;
    password: string;
  };
  permission?: "CANDIDATE" | "EMPLOYER";
}

export type ITypeAuth = "phone" | "google" | "facebook";

export type IPermissionType = "ADMIN" | "MANAGER" | "USER" | "EMPLOYER";

export type IPermissionItem = {
  type: IPermissionType;
  name: string;
  lowerPermissions: IPermissionType[];
};

export type IPermission = {
  [key in IPermissionType]: IPermissionItem;
};
export interface IUpdateAccount {
  idUser: string;
  email: string;
  password: string;
}
export const PERMISSION: IPermission = {
  ADMIN: {
    type: "ADMIN",
    name: "Quản trị viên",
    lowerPermissions: ["MANAGER", "EMPLOYER", "USER"],
  },
  MANAGER: {
    type: "MANAGER",
    name: "Nhân viên hệ thống",
    lowerPermissions: ["USER", "EMPLOYER"],
  },
  USER: {
    type: "USER",
    name: "Ứng tuyển",
    lowerPermissions: [],
  },
  EMPLOYER: {
    type: "EMPLOYER",
    name: "Nhà tuyển dụng",
    lowerPermissions: [],
  },
};
