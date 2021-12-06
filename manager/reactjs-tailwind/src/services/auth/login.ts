import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { ILogin } from "typings";

const LOGIN = gql`
  mutation ($user: LoginUserInput!) {
    login(user: $user) {
      accessToken
      refreshToken
      userId {
        id
      }
      userInfo {
        _id
        provider
        displayName
        fullName
        username
        email
      }
    }
  }
`;

export const login = async (variables: ILogin) => {
  const response = await graphQLCommon(LOGIN, variables);
  return response;
};
