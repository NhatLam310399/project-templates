import { IMongoObjectId, IBookingStatus, IBooking } from "common/typings";

export interface IDetailBooking {
  successBooking?: number;
  waitingForApprovedBooking?: number;
  approvedBooking?: number;
  canceledBooking?: number;
}

export interface IFilterDetailBooking {
  oneDay?: Date;
  status?: IBookingStatus;
  placeId?: string;
  user?: string;
}

export interface IGetDetailBooking {
  filterDetailBooking?: IFilterDetailBooking;
  page?: number;
  size?: number;
}

export type ITypeDialog = "PAYMENT_SUCCESS" | "EXPORT" | "PAYMENT" | "CLOSE";
