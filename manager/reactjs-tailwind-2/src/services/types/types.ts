import { gql } from "apollo-boost";
import { IGetTypesByCode, IById } from "common/typings";
import { graphQLCommon } from "common/utils/api";
import { ICreateTypes, IUpdateTypes } from "common/typings/Types";

const GET_TYPES_BY_CODE = gql`
  query ($code: String!, $page: Int, $size: Int) {
    getTypesByCode(code: $code, page: $page, size: $size) {
      results {
        _id
        name
        image {
          default
          small
        }
        code
        value
        slug
        language
      }
      totalCount
    }
  }
`;
export const getTypesByCode = async (variables: IGetTypesByCode) => {
  const result = await graphQLCommon(GET_TYPES_BY_CODE, variables);
  return result;
};

const CREATE_TYPES = gql`
  mutation ($createTypesInput: CreateTypesInput) {
    createTypes(createTypesInput: $createTypesInput) {
      _id
    }
  }
`;

export const createTypes = async (variables: ICreateTypes) => {
  const response = await graphQLCommon(CREATE_TYPES, variables);
  return response;
};

const UPDATE_TYPES = gql`
  mutation ($id: String!, $fieldsToUpdate: UpdateTypesInput!) {
    updateTypes(id: $id, fieldsToUpdate: $fieldsToUpdate) {
      _id
    }
  }
`;

export const updateTypes = async (variables: IUpdateTypes) => {
  const response = await graphQLCommon(UPDATE_TYPES, variables);
  return response;
};

const REMOVE_TYPES = gql`
  mutation ($id: String!) {
    removeTypes(id: $id)
  }
`;

export const removeTypes = async (variables: IById) => {
  const response = await graphQLCommon(REMOVE_TYPES, variables);
  return response;
};
