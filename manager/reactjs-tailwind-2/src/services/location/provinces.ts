import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetProvince, IUpdateProvince } from "common/typings";

const GET_PROVINCES = gql`
  query ($name: String, $page: Int = 0, $size: Int) {
    getProvinces(name: $name, page: $page, size: $size) {
      totalCount
      provinces {
        _id
        name
        code
        unit
      }
    }
  }
`;
export const getProvinces = async (variables: IGetProvince) => {
  const result = await graphQLCommon(GET_PROVINCES, variables);
  return result;
};

const UPDATE_PROVINCE = gql`
  mutation ($id: String!, $input: ProvinceInput!) {
    updateProvince(id: $id, provinceInput: $input) {
      name
    }
  }
`;
export const updateProvince = async (variables: IUpdateProvince) => {
  const result = await graphQLCommon(UPDATE_PROVINCE, variables);
  return result;
};
