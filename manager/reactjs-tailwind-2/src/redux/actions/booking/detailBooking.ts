import * as types from "redux/types/booking";
import { IGetDetailBooking, ITypeDialog } from "common/typings/Booking";

export const getDetailBooking = (payload: IGetDetailBooking) => ({
  type: types.GET_DETAIL_BOOKING,
  payload,
});

export const getDetailBookingSuccess = <T>(payload: T) => ({
  type: types.GET_DETAIL_BOOKING_SUCCESS,
  payload,
});

export const setTypeDialogActive = (payload: ITypeDialog) => ({
  type: types.TYPE_DIALOG,
  payload,
});
