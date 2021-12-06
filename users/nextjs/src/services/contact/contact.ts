import { gql } from "apollo-boost";

import { ICreateContact } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const CREATE_CONTACT = gql`
  mutation($contactInput: ContactInput!) {
    createContact(contactInput: $contactInput) {
      _id
      name
    }
  }
`;

export const createContact = async (variables: ICreateContact) => {
  const response = await graphQLCommon(CREATE_CONTACT, variables);
  return response;
};
