import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_HOME_PAGE = gql`
  query {
    getAllHomePage {
      totalUser
      totalBoss
      totalCareStaff
      totalManager
      totalStopWorkingCompany
      totalActiveCompany
      totalCompany
      totalKaraoke
      totalActiveKaraoke
      totalStopWorkingKaraoke
      totalBooking
      totalCoupon
      totalCareRequirements
      totalNotCareRequirement
      totalProduct
      totalCategory
      totalDocument
      totalDocumentCategory
    }
  }
`;

export const getAllHomePage = async () => {
  const response = await graphQLCommon(GET_ALL_HOME_PAGE, {});
  return response;
};
