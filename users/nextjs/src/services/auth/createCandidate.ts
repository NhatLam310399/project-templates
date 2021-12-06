import { ICreateUserInput } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const CREATE_CANDIDATE = gql`
  mutation CreateCandidateMutation($createUserInput: CreateCandidateInput!) {
    createCandidate(createUserInput: $createUserInput) {
      _id
      phoneNumber
    }
  }
`;

export const createCandidate = async (variables: ICreateUserInput) => {
  const response = await graphQLCommon(CREATE_CANDIDATE, variables);
  return response;
};
