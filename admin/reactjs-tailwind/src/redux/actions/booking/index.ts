import {
  IDeleteBooking,
  IGetAllBooking,
  IUpdateBooking,
  IUpdateFinishBooking,
  IUpdateStatusBooking,
} from "common/typings/Booking";
import * as types from "redux/types/booking";

export const getAllBooking = (payload: IGetAllBooking) => ({
  type: types.GET_ALL_BOOKING,
  payload,
});
export const getAllBookingSuccess = (payload: IGetAllBooking) => ({
  type: types.GET_ALL_BOOKING_SUCCESS,
  payload,
});

export const updateBooking = (payload: IUpdateBooking) => ({
  type: types.UPDATE_BOOKING,
  payload,
});
export const updateStatusBooking = (payload: IUpdateStatusBooking) => ({
  type: types.UPDATE_STATUS_BOOKING,
  payload,
});
export const updateFinishBooking = (payload: IUpdateFinishBooking) => ({
  type: types.UPDATE_FINISH_BOOKING,
  payload,
});

export const deleteBooking = (payload: IDeleteBooking) => ({
  type: types.DELETE_BOOKING,
  payload,
});
