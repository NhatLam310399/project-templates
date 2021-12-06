import { IBookingSortType, IBookingStatus } from "common/typings";

export interface IBookingSortTypeItem {
  name?: string;
  value?: IBookingSortType;
}

export const sortTypeList: IBookingSortTypeItem[] = [
  {
    name: "Mới nhất",
    value: "latest",
  },
];

export interface IBookingStatusItem {
  name?: string;
  value?: IBookingStatus;
}

export const statusFilterList: IBookingStatusItem[] = [
  {
    name: "Đã duyệt",
    value: "booked",
  },
  {
    name: "Hoàn thành",
    value: "finished",
  },
  { name: "Đang xử lý", value: "waiting_for_approved" },
  { name: "Huỷ lịch", value: "canceled" },
  { name: " Tất cả", value: undefined },
];
