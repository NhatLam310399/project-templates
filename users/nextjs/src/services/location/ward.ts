import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetWards } from "@common/typings";

const GET_WARDS_BY_DISTRICT = gql`
  query($districtCode: String!) {
    getWardsByDistrict(districtCode: $districtCode, page: 0, size: 999) {
      totalCount
      wards {
        _id
        name
        longitude
        latitude
        code
      }
    }
  }
`;
export const getWardsByDistrict = async (variables: IGetWards) => {
  const response = await graphQLCommon(GET_WARDS_BY_DISTRICT, variables);
  return response;
};
