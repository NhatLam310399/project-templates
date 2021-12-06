import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetAllBooking } from "common/typings/Booking";

const GET_ALL_BOOKING = gql`
  query ($filterBooking: FilterBooking, $page: Int, $size: Int) {
    getAllBooking(filterBooking: $filterBooking, page: $page, size: $size) {
      totalCount
      results {
        _id
        place {
          _id
          name
        }
        bookingCode
        room {
          _id
          name
        }
        timeStart
        timeEnd
        name
        phoneNumber
        email
        amount
        coupon {
          _id
          name
        }
        createdBy {
          _id
          displayName
          username
          email
          phoneNumber
        }
        status
        hourPrice
        cost
        totalPayment
        cancellationReason
        surcharge
        createdAt
      }
    }
  }
`;
export const getAllBooking = async (variables: IGetAllBooking) => {
  const result = await graphQLCommon(GET_ALL_BOOKING, variables);
  return result;
};
