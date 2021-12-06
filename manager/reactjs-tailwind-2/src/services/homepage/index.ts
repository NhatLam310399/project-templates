import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IGetAllHomePageManager } from "common/typings";

const GET_ALL_HOME_PAGE_MANAGER = gql`
  query ($placeId: String) {
    getAllHomePageManager(placeId: $placeId) {
      successBooking
      approvedBooking
      waitingForApprovedBooking
      canceledBooking
      revenue
      totalRoom
      totalCustomer
    }
  }
`;

export const getAllHomePageManager = async (
  variables: IGetAllHomePageManager,
) => {
  const response = await graphQLCommon(GET_ALL_HOME_PAGE_MANAGER, {
    variables,
  });
  return response;
};
