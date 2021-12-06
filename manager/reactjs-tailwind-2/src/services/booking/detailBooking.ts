import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetDetailBooking } from "common/typings/Booking";

const GET_DETAIL_BOOKING = gql`
  query ($filterDetailBooking: FilterDetailBooking, $page: Int, $size: Int) {
    getDetailBooking(
      filterDetailBooking: $filterDetailBooking
      page: $page
      size: $size
    ) {
      successBooking
      waitingForApprovedBooking
      approvedBooking
      canceledBooking
    }
  }
`;
export const getDetailBooking = async (variables: IGetDetailBooking) => {
  const result = await graphQLCommon(GET_DETAIL_BOOKING, variables);
  return result;
};
