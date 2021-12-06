import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
  IUpdateBooking,
  IUpdateFinishBooking,
  IUpdateStatusBooking,
} from "common/typings/Booking";

const UPDATE_BOOKING = gql`
  mutation ($id: String, $updateBookingInput: UpdateBookingInput) {
    updateBooking(id: $id, updateBookingInput: $updateBookingInput) {
      _id
      bookingCode
    }
  }
`;
export const updateBooking = async (variables: IUpdateBooking) => {
  const result = await graphQLCommon(UPDATE_BOOKING, variables);
  return result;
};

const UPDATE_STATUS_BOOKING = gql`
  mutation ($id: String, $status: BookingStatus) {
    updateStatusBooking(id: $id, status: $status) {
      _id
    }
  }
`;
export const updateStatusBooking = async (variables: IUpdateStatusBooking) => {
  const result = await graphQLCommon(UPDATE_STATUS_BOOKING, variables);
  return result;
};

const UPDATE_FINISH_BOOKING = gql`
  mutation ($id: String, $surcharge: Int) {
    updateFinishBooking(id: $id, surcharge: $surcharge) {
      _id
    }
  }
`;
export const updateFinishBooking = async (variables: IUpdateFinishBooking) => {
  const result = await graphQLCommon(UPDATE_FINISH_BOOKING, variables);
  return result;
};
