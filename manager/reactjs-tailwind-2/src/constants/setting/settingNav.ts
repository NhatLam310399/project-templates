import { typeTitle } from "./permissionTitle";

export type ISettingNavValue =
  | "place"
  | "own"
  | "image"
  | "video"
  | "closingTime";

export interface ISettingNavItem {
  name: string;
  value: ISettingNavValue;
}

export const KARAOKE_NAV_SETTING: ISettingNavItem[] = [
  { name: "Thông tin quán", value: "place" },
  { name: "Thông tin chủ quán", value: "own" },
  { name: "Hình ảnh quán", value: "image" },
  { name: "Video quán", value: "video" },
  { name: "Lịch dừng hoạt động", value: "closingTime" },
];

export const COMPANY_NAV_SETTING: ISettingNavItem[] = [
  { name: "Thông tin công ty", value: "place" },
  { name: "Thông tin chủ công ty", value: "own" },
  { name: "Hình ảnh công ty", value: "image" },
  { name: "Video công ty", value: "video" },
];
