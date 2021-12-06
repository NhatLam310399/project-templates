import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
  ICreateProvince,
  IDeleteProvince,
  IGetProvince,
  IProvince,
  IUpdateProvince,
} from "common/typings";

const GET_PROVINCES = gql`
  query ($name: String, $page: Int = 0, $size: Int) {
    getProvinces(name: $name, page: $page, size: $size) {
      totalCount
      provinces {
        _id
        name
        code
        unit
        longitude
        latitude
      }
    }
  }
`;

export const getProvinces = async (variables: IGetProvince) => {
  const result = await graphQLCommon(GET_PROVINCES, variables);
  return result;
};

const CREATE_PROVINCE = gql`
  mutation ($provinceInput: ProvinceInput!) {
    createProvince(provinceInput: $provinceInput) {
      _id
      name
    }
  }
`;
export const createProvince = async (variables: ICreateProvince) => {
  const result = await graphQLCommon(CREATE_PROVINCE, variables);
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
const DELETE_PROVINCE = gql`
  mutation ($id: String!) {
    deleteProvince(id: $id)
  }
`;
export const deleteProvince = async (variables: IDeleteProvince) => {
  const result = await graphQLCommon(DELETE_PROVINCE, variables);
  return result;
};
