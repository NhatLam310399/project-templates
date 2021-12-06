import { graphQLCommon } from "@common/utils/api";
import gql from "graphql-tag";

const GET_KEYWORD = gql`
  query {
    getMostSearchKeyword {
      _id
      name
      keywords
      isHot
    }
  }
`;
export const getMostKeyword = async () => {
  const response = await graphQLCommon(GET_KEYWORD, {});
  return response;
};
