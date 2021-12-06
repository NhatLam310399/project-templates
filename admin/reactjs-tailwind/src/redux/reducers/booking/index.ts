import producer from "immer";
import * as types from "redux/types/booking";
import { IBooking } from "common/typings";

interface INotification {
  booking: {
    results: IBooking[];
    totalCount: number;
  };
}

const initialState: INotification = {
  booking: {
    results: [],
    totalCount: 0,
  },
};

const booking = (state = initialState, actions: any) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ALL_BOOKING_SUCCESS:
        draft.booking.results = actions.payload.results;
        draft.booking.totalCount = actions.payload.totalCount;
        break;
      default:
        break;
    }
  });
export default booking;
