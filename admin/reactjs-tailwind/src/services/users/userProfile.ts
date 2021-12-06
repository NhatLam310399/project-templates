import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IUpdateUserProfile, IUpdateUserProfileByAdmin } from "common/typings";

const UPDATE_USER_PROFILE = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUserProfile(updateUserInput: $updateUserInput) {
      _id
      displayName
    }
  }
`;

export const updateUserProfile = async (variables: IUpdateUserProfile) => {
  const response = await graphQLCommon(UPDATE_USER_PROFILE, variables);
  return response;
};

const UPDATE_USER_PROFILE_BY_ADMIN = gql`
  mutation (
    $id: String!
    $password: String!
    $updateUserInput: UpdateUserInput!
  ) {
    updateUserProfileByAdmin(
      id: $id
      password: $password
      updateUserInput: $updateUserInput
    ) {
      _id
      displayName
    }
  }
`;

export const updateUserProfileByAdmin = async (
  variables: IUpdateUserProfileByAdmin,
) => {
  const response = await graphQLCommon(UPDATE_USER_PROFILE_BY_ADMIN, variables);
  return response;
};
