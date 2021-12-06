import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetWards, IUpdateWards } from "typings";

const GET_WARDS_BY_DISTRICT = gql`
  query ($district_code: String, $page: Int = 0, $size: Int) {
    getWardsByDistrict(
      district_code: $district_code
      page: $page
      size: $size
    ) {
      totalCount
      wards {
        _id
        name
        code
        district_code
        district_name
        province_code
        province_name
      }
    }
  }
`;
export const getWardsByDistrict = async (variables: IGetWards) => {
  const result = await graphQLCommon(GET_WARDS_BY_DISTRICT, variables);
  return result;
};

const UPDATE_WARD = gql`
  mutation ($id: String!, $input: WardInput!) {
    updateWard(id: $id, wardInput: $input) {
      name
    }
  }
`;
export const updateWard = async (variables: IUpdateWards) => {
  const result = await graphQLCommon(UPDATE_WARD, variables);
  return result;
};
