import { IPermissionType } from "common/typings";

type IOptionType = "everyone" | "onePerson";

export type INotifyOptionItem = {
  name: string;
  value: IOptionType;
};

export const OPTIONS_NOTIFICATION: INotifyOptionItem[] = [
  {
    name: "Thông báo cho tất cả",
    value: "everyone",
  },
  {
    name: "Thông báo cho cá nhân",
    value: "onePerson",
  },
];

export type INotifyPermissionItem = {
  name: string;
  value: IPermissionType;
};

export const PERMISSIONS_NOTIFICATION: INotifyPermissionItem[] = [
  {
    name: "Nhân viên hệ thống",
    value: "MANAGER",
  },
  {
    name: "Chủ doanh nghiệp",
    value: "BOSS",
  },
  {
    name: "Nhân viên chăm sóc khách hàng",
    value: "CARE_STAFF",
  },
  {
    name: "Người dùng bình thường",
    value: "USER",
  },
];
