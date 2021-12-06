import producer from "immer";
import * as types from "redux/types/booking";
import { IBooking, IDetailBooking, ITypeDialog } from "common/typings";

interface IBookingState {
  allBooking: {
    results: IBooking[];
    totalCount: number;
  };
  booking: IBooking | null;
  detailBooking: IDetailBooking[];
  typeDialogActive: ITypeDialog;
}

const initialState: IBookingState = {
  allBooking: {
    results: [],
    totalCount: 0,
  },
  booking: null,
  detailBooking: [],
  typeDialogActive: "PAYMENT",
};

const bookingReducer = (state = initialState, actions: any) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ALL_BOOKING_SUCCESS:
        draft.allBooking = actions.payload;
        break;
      case types.GET_DETAIL_BOOKING_SUCCESS:
        draft.detailBooking = actions.payload;
        break;
      case types.TYPE_DIALOG:
        draft.typeDialogActive = actions.payload;
        break;
      default:
        break;
    }
  });

export default bookingReducer;
