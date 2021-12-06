import { IUpdateAccount } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const UPDATE_USER_EMAIL_PASSWORD = gql`
  mutation ($idUser: String, $email: String, $password: String) {
    updateUserEmailPassword(idUser: $idUser, email: $email, password: $password){
      _id
    }
  }
`;

export const updateUserEmailPassword = async (variables: IUpdateAccount) => {
  const response = await graphQLCommon(UPDATE_USER_EMAIL_PASSWORD, variables);
  return response;
};
