import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { ICreateRequest } from "common/typings";

const CREATE_REQUEST = gql`
  mutation ($requestCreateInput: PlaceCreateInput!) {
    createRequest(requestCreateInput: $requestCreateInput) {
      _id
    }
  }
`;

export const createRequest = async (variables: ICreateRequest) => {
  const response = await graphQLCommon(CREATE_REQUEST, variables);
  return response;
};
