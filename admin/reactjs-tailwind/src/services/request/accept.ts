import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IAcceptRequest } from "common/typings";

const ACCEPT_REQUEST = gql`
  mutation ($id: String) {
    acceptRequest(id: $id)
  }
`;

export const acceptRequest = async (variables: IAcceptRequest) => {
  console.log("service accept", variables);
  const response = await graphQLCommon(ACCEPT_REQUEST, variables);
  return response;
};
