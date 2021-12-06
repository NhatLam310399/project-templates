import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_POSITION = gql`
  query {
    getAllPosition(page: 0, size: 99) {
      totalCount
      results {
        name
        description
        _id
      }
    }
  }
`;

export const getAllPosition = async () => {
  const response = await graphQLCommon(GET_ALL_POSITION, {});
  return response;
};
