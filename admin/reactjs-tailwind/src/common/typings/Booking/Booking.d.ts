import {
  IMongoObjectId,
  IPlace,
  IRoom,
  IUser,
  ICoupon,
  IPaymentType,
  IBookingStatus,
  ILocationTypeInput,
} from "common/typings";

export interface IBooking {
  _id?: IMongoObjectId;
  place?: IPlace;
  bookingCode?: string;
  room?: IRoom;
  timeStart?: Date;
  timeEnd?: Date;
  name?: string;
  phoneNumber?: string;
  email?: string;
  amount?: number;
  coupon?: ICoupon;
  createdBy?: IUser;
  updatedBy?: IUser;
  status?: IBookingStatus;
  hourPrice?: number;
  cost?: number;
  totalPayment?: number;
  cancellationReason?: string;
  surcharge?: number;
  createdAt?: Date;
}
export interface IFilterBooking {
  status?: string;
  isMyBooking?: boolean;
  oneDay?: Date;
  bookingCode?: string;
}
export interface IGetAllBooking {
  filterBooking?: IFilterBooking;
  page?: number;
  size?: number;
}

export interface IUpdateBooking {
  updateBookingInput?: IBookingInput;
  id: string;
}

export interface IBookingInput {
  name?: string;
  phoneNumber?: string;
  email?: string;
  amount?: number;
  couponId?: string;
  hourPrice?: number;
  cost?: number;
  totalPayment?: number;
  timeStart?: Date;
  timeEnd?: Date;
  surcharge?: number;
  status?: IBookingStatus;
  cancellationReason?: string;
  rate?: number;
}
export interface IUpdateFinishBooking {
  id: string;
  surcharge: number;
}
export interface IUpdateStatusBooking {
  id: string;
  status?: IBookingStatus;
}
export interface IDeleteBooking {
  id: string;
}
