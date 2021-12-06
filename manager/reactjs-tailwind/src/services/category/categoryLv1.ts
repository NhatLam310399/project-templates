import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { ICategoryLevel1 } from "typings";

const GET_ALL_CATEGORIES_LV_1 = gql`
  query ($filterCategoryLevel1: FilterCategoryLevel1, $page: Int, $size: Int) {
    getAllCategoryLevel1(
      filterCategoryLevel1: $filterCategoryLevel1
      page: $page
      size: $size
    ) {
      results {
        _id
        name
        image {
          medium
        }
      }
      totalCount
    }
  }
`;

export const getAllCategoryLv1 = async (variables: ICategoryLevel1) => {
  const response = await graphQLCommon(GET_ALL_CATEGORIES_LV_1, variables);
  return response;
};
