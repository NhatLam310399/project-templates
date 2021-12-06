import { ICustomSizeImages, IUser, IMongoObjectId } from "common/typings";

export interface ICustomer {
  _id: IMongoObjectId;
  user?: IUser;
  createAt?: Date | string;
  bookingTime?: number;
  bookingStatusAssemble?: {
    completed: number;
    pending: number;
    approved: number;
    cancel: number;
  };
}
export interface IHistoryCustomerBooking {
  user?: IUser;
  amount?: number;
  bookingStartDate?: Date;
}

export interface IGetAllCustomerByKaraoke {
  idKara?: string;
  page?: number;
  size?: number;
}
