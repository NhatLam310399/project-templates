import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetDistricts } from "@common/typings";

const GET_DISTRICTS = gql`
  query($provinceCode: String!) {
    getDistrictsByProvince(provinceCode: $provinceCode, page: 0, size: 9999) {
      totalCount
      districts {
        _id
        name
        longitude
        latitude
        code
      }
    }
  }
`;
export const getDistricts = async (variables: IGetDistricts) => {
  const result = await graphQLCommon(GET_DISTRICTS, variables);
  return result;
};
