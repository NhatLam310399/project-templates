import { IGetTag } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_TAG = gql`
  query Query($filterTag: FilterTag, $size: Int, $page: Int) {
    getAllTag(filterTag: $filterTag, size: $size, page: $page) {
      results {
        _id
        name
      }
      totalCount
    }
  }
`;

export const getAllTag = async (variables: IGetTag) => {
  const response = await graphQLCommon(GET_ALL_TAG, variables);
  return response;
};
