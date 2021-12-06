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
  billCode?: string;
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
  rewardPoints?: number;
  surcharge?: number;
  createdAt?: Date;
}
export interface IFilterBooking {
  status?: IBookingStatus;
  isMyBooking?: boolean;
  oneDay?: Date;
  placeId?: string;
  createdById?: string;
  bookingCode?: string;
  user?: string;
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
