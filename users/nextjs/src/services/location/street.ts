import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetStreet } from "@common/typings";

const GET_STREETS = gql`
  query($province: String!, $district: String!) {
    getStreetByProvinceAndDistrict(
      province: $province
      district: $district
      streetName: ""
      page: 0
      size: 999
    ) {
      totalCount
      streets {
        _id
        name
        longitude
        latitude
        code
      }
    }
  }
`;
export const getStreets = async (variables: IGetStreet) => {
  const result = await graphQLCommon(GET_STREETS, variables);
  return result;
};
