import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetCategoryLevel1, IGetCategoryLevel2 } from "@common/typings";

const GET_CATEGORY_LEVEL1 = gql`
  query($filterCategoryLevel1: FilterCategoryLevel1) {
    getAllCategoryLevel1(
      filterCategoryLevel1: $filterCategoryLevel1
      page: 0
      size: 9999
    ) {
      totalCount
      results {
        name
        _id
      }
    }
  }
`;
export const getCategoryLevel1 = async (variables: IGetCategoryLevel1) => {
  const result = await graphQLCommon(GET_CATEGORY_LEVEL1, variables);
  return result;
};

const GET_CATEGORY_LEVEL2 = gql`
  query($filterCategoryLevel2: FilterCategoryLevel2, $page: Int, $size: Int) {
    getAllCategoryLevel2(
      filterCategoryLevel2: $filterCategoryLevel2
      page: $page
      size: $size
    ) {
      totalCount
      results {
        slug
        name
        _id
        categoryLevel1 {
          _id
          name
        }
      }
    }
  }
`;
export const getCategoryLevel2 = async (variables: IGetCategoryLevel2) => {
  const result = await graphQLCommon(GET_CATEGORY_LEVEL2, variables);
  return result;
};
