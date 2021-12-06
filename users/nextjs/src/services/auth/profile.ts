import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";
import { IUpdateUserPassword, IUpdateUserProfile } from "@common/typings";

const REFRESH_TOKEN = gql`
  query {
    refreshToken {
      accessToken
      refreshToken
      userInfo {
        _id
        provider
        birthday
        gender
        firstName
        permission
        password
        email
        lastName
        displayName
        urlAvt {
          default
        }
        identityCard
        username
        email
        phoneNumber
        appliedRecruitment {
          recruitment {
            _id
            slug
          }
          date
        }
        savedRecruitment {
          _id
          slug
        }
        subscribedCompany {
          _id
          name
        }
        seenCompany {
          name
        }
        code
        point
        province{
          _id
          name
        }
        district{
          _id
          name
        }
        ward{
          _id
          name
        }
        street{
          _id
          name
        }
      }
    }
  }
`;

export const refreshToken = async () => {
  const result = await graphQLCommon(REFRESH_TOKEN, {});
  return result;
};

const UPDATE_USER_PASSWORD = gql`
  mutation($updatePasswordInput: UpdatePasswordInput!) {
    updateUserPassword(updatePasswordInput: $updatePasswordInput) {
      _id
      username
    }
  }
`;

export const updateUserPassword = async (variables: IUpdateUserPassword) => {
  const result = await graphQLCommon(UPDATE_USER_PASSWORD, variables);
  return result;
};

const UPDATE_USER_PROFILE = gql`
  mutation($updateUserInput: UpdateUserInput!) {
    updateUserProfile(updateUserInput: $updateUserInput) {
      _id
      username
    }
  }
`;

export const updateUserProfile = async (variables: IUpdateUserProfile) => {
  const result = await graphQLCommon(UPDATE_USER_PROFILE, variables);
  return result;
};
