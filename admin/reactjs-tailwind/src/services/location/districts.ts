import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
  ICreateDistrict,
  IDeleteDistrict,
  IGetDistricts,
  IUpdateDistrict,
} from "common/typings";

const GET_DISTRICTS_BY_PROVINCE = gql`
  query (
    $page: Int = 0
    $size: Int
    $province_code: String
    $district_name: String
  ) {
    getDistrictsByProvince(
      district_name: $district_name
      province_code: $province_code
      page: $page
      size: $size
    ) {
      totalCount
      districts {
        _id
        name
        code
        unit
        province_name
        province_code
        longitude
        latitude
      }
    }
  }
`;
export const getDistrictsByProvince = async (variables: IGetDistricts) => {
  const result = await graphQLCommon(GET_DISTRICTS_BY_PROVINCE, variables);
  return result;
};

// For Search feature
const GET_DISTRICTS = gql`
  query ($page: Int = 0, $size: Int, $name: String) {
    getDistricts(name: $name, page: $page, size: $size) {
      totalCount
      districts {
        _id
        name
        code
        unit
        province_name
        province_code
        longitude
        latitude
      }
    }
  }
`;
export const getDistricts = async (variables: IGetDistricts) => {
  const result = await graphQLCommon(GET_DISTRICTS, variables);
  return result;
};

const CREATE_DISTRICT = gql`
  mutation ($districtInput: DistrictInput!) {
    createDistrict(districtInput: $districtInput) {
      _id
      name
    }
  }
`;
export const createDistrict = async (variables: ICreateDistrict) => {
  const result = await graphQLCommon(CREATE_DISTRICT, variables);
  return result;
};

const UPDATE_DISTRICT = gql`
  mutation ($id: String!, $districtInput: DistrictInput!) {
    updateDistrict(id: $id, districtInput: $districtInput) {
      name
    }
  }
`;
export const updateDistrict = async (variables: IUpdateDistrict) => {
  const result = await graphQLCommon(UPDATE_DISTRICT, variables);
  return result;
};

const DELETE_DISTRICT = gql`
  mutation ($id: String!) {
    deleteDistrict(id: $id)
  }
`;
export const deleteDistrict = async (variables: IDeleteDistrict) => {
  const result = await graphQLCommon(DELETE_DISTRICT, variables);
  return result;
};
