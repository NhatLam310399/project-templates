import { gql } from "apollo-boost";
import { IGetAllTypeUser, IUpdateTypeUser } from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_TYPE_USER = gql`
  query ($page: Int, $size: Int) {
    getAllTypeUser(page: $page, size: $size) {
      totalCount
      results {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllTypeUser = async (variables: IGetAllTypeUser) => {
  const result = await graphQLCommon(GET_ALL_TYPE_USER, variables);
  return result;
};

const CREATE_TYPE_USER = gql`
  mutation ($typeUserCreateInput: TypeUserCreateInput!) {
    createTypeUser(typeUserCreateInput: $typeUserCreateInput) {
      _id
    }
  }
`;

export const createTypeUser = async (variables: IGetAllTypeUser) => {
  const response = await graphQLCommon(CREATE_TYPE_USER, variables);
  return response;
};

const UPDATE_TYPE_USER = gql`
  mutation ($id: String!, $typeUserUpdateInput: TypeUserUpdateInput!) {
    updateTypeUser(id: $id, typeUserUpdateInput: $typeUserUpdateInput) {
      _id
    }
  }
`;

export const updateTypeUser = async (variables: IUpdateTypeUser) => {
  const response = await graphQLCommon(UPDATE_TYPE_USER, variables);
  return response;
};
