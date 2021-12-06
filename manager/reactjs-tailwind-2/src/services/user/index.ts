import { gql } from "apollo-boost";
import {
  IUpdateUserProfileInput,
  IGetUserByID,
  IGetIdByPhoneNumber,
  ICheckEmailExistByAdmin,
} from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ID_BY_PHONE_NUMBER = gql`
  query ($phoneNumber: String!) {
    getIdByPhoneNumber(phoneNumber: $phoneNumber) {
      _id
      language
      highlight
      lastSeenAt
      deviceToken
      rate
      clientId
      provider
      birthday
      gender
      urlAvt {
        small
        default
      }
      identifyCard
      displayName
      username
      email
      phoneNumber
      permission
    }
  }
`;

export const getIdByPhoneNumber = async (variables: IGetIdByPhoneNumber) => {
  const result = await graphQLCommon(GET_ID_BY_PHONE_NUMBER, variables);
  return result;
};

const CHECK_EMAIL_EXIST_BY_ADMIN = gql`
  mutation ($email: String) {
    checkEmailExistByAdmin(email: $email)
  }
`;

export const checkEmailExistByAdmin = async (
  variables: ICheckEmailExistByAdmin,
) => {
  const result = await graphQLCommon(CHECK_EMAIL_EXIST_BY_ADMIN, variables);
  return result;
};

const GET_USER_BY_ID = gql`
  query ($id: String!) {
    getUserById(id: $id) {
      _id
      language
      highlight
      lastSeenAt
      deviceToken
      rate
      clientId
      provider
      birthday
      gender
      urlAvt {
        small
        default
      }
      identifyCard
      displayName
      username
      email
      phoneNumber
      permission
      province {
        _id
        code
        name
      }
      district {
        _id
        code
        name
      }
      ward {
        _id
        code
        name
      }
      street
      enabled
      nameOnBankCard
      bankCardNumber
      bankName
      tradingAddress
      isHot
      coupon {
        _id
        name
      }
      slug
      keywords
      favouriteKaraoke {
        _id
        name
      }
      point
      createdAt
      updatedAt
      documents {
        _id
        name
      }
    }
  }
`;

export const getUserById = async (variables: IGetUserByID) => {
  const result = await graphQLCommon(GET_USER_BY_ID, variables);
  return result;
};

const UPDATE_USER_PROFILE = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUserProfile(updateUserInput: $updateUserInput) {
      _id
    }
  }
`;
export const updateUserProfile = async (variables: IUpdateUserProfileInput) => {
  const result = await graphQLCommon(UPDATE_USER_PROFILE, variables);
  return result;
};
