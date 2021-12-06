import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IGetALlCategories } from "common/typings";

const GET_ALL_CATEGORIES = gql`
  query ($filterCategory: FilterCategory, $page: Int, $size: Int) {
    getAllCategories(
      filterCategory: $filterCategory
      page: $page
      size: $size
    ) {
      result {
        _id
        name
        code
      }
    }
  }
`;
export const getAllCategories = async (variables: IGetALlCategories) => {
  const response = await graphQLCommon(GET_ALL_CATEGORIES, variables);
  return response;
};
