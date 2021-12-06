import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
  ICreateUser,
  ICheckExistEmail,
  IUpdatePasswordUser,
} from "typings/Users";

const CREATE_USER = gql`
  mutation ($createUserInput: CreateUserInput) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;
export const createUser = async (variables: ICreateUser) => {
  const response = await graphQLCommon(CREATE_USER, variables);
  return response;
};

const CHECK_EXIST_EMAIL = gql`
  query ($email: String!) {
    isExistEmail(email: $email)
  }
`;
export const checkExistEmail = async (variables: ICheckExistEmail) => {
  const response = await graphQLCommon(CHECK_EXIST_EMAIL, variables);
  return response;
};
const CHECK_EXIST_EMAIL_OTHER_PROVIDER = gql`
  query ($email: String!) {
    isExistEmailOtherProvider(email: $email)
  }
`;
export const checkExistEmailOtherProvider = async (
  variables: ICheckExistEmail,
) => {
  const response = await graphQLCommon(
    CHECK_EXIST_EMAIL_OTHER_PROVIDER,
    variables,
  );
  return response;
};

const UPDATE_PASSWORD_USER = gql`
  mutation ($idUser: String!, $password: String!) {
    updatePasswordUser(idUser: $idUser, password: $password)
  }
`;
export const updatePassword = async (variables: IUpdatePasswordUser) => {
  const response = await graphQLCommon(UPDATE_PASSWORD_USER, variables);
  return response;
};
