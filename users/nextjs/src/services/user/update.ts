import { gql } from "apollo-boost";

import { IUpdateUserInput } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfileMutation($updateUserInput: UpdateUserInput!) {
    updateUserProfile(updateUserInput: $updateUserInput) {
      _id
      displayName
    }
  }
`;

export const updateUserProfile = async (variables: IUpdateUserInput) => {
  const response = await graphQLCommon(UPDATE_USER_PROFILE, variables);
  return response;
};
