import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IDeleteRequest } from "common/typings";

const DELETE_REQUEST = gql`
  mutation ($id: String!) {
    deleteRequestById(id: $id)
  }
`;

export const deleteRequest = async (variables: IDeleteRequest) => {
  const response = await graphQLCommon(DELETE_REQUEST, variables);
  return response;
};
