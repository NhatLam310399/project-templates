import { IPermissionType } from "common/typings";

export type IPermissionItem = {
  type: IPermissionType;
  name: string;
  lowerPermissions: IPermissionType[];
};

export type IPermission = {
  [key in IPermissionType]: IPermissionItem;
};

export const PERMISSION: IPermission = {
  ADMIN: {
    type: "ADMIN",
    name: "Quản trị viên",
    lowerPermissions: ["MANAGER", "CARE_STAFF", "USER", "BOSS"],
  },
  MANAGER: {
    type: "MANAGER",
    name: "Nhân viên hệ thống",
    lowerPermissions: ["CARE_STAFF", "USER", "BOSS"],
  },
  CARE_STAFF: {
    type: "CARE_STAFF",
    name: "Nhân viên chăm sóc khách hàng",
    lowerPermissions: ["BOSS", "USER"],
  },
  BOSS: {
    type: "BOSS",
    name: "Chủ doanh nghiệp",
    lowerPermissions: [],
  },
  USER: {
    type: "USER",
    name: "Người dùng bình thường",
    lowerPermissions: [],
  },
};
