import { gql } from "apollo-boost";
import { IGetTypesByCode } from "typings";
import { graphQLCommon } from "common/utils/api";

const GET_TYPES_BY_CODE = gql`
  query ($code: String!, $language: String) {
    getTypesByCode(code: $code, language: $language) {
      _id
      name
      code
    }
  }
`;
export const getTypesByCode = async (variables: IGetTypesByCode) => {
  const result = await graphQLCommon(GET_TYPES_BY_CODE, variables);
  return result;
};
