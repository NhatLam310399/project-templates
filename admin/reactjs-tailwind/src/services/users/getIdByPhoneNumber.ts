import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IGetIdByPhoneNumber } from "common/typings";

const GET_ID_BY_PHONE_NUMBER = gql`
  query ($phoneNumber: String!) {
    getIdByPhoneNumber(phoneNumber: $phoneNumber) {
      _id
      phoneNumber
    }
  }
`;

export const getIdByPhoneNumber = async (variables: IGetIdByPhoneNumber) => {
  const result = await graphQLCommon(GET_ID_BY_PHONE_NUMBER, variables);
  return result;
};
