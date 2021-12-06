import { IResetPasswordInput } from "@common/typings";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";

const RESET_PASSWORD = gql`
  mutation ResetPasswordMutation($username: String!, $newPassword: String) {
    resetPassword(username: $username, newPassword: $newPassword)
  }
`;
export const resetPassword = async (variables: IResetPasswordInput) => {
  const result = await graphQLCommon(RESET_PASSWORD, variables);
  return result;
};
