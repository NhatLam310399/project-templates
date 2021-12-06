import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IGetAllCategoryLevel2 } from "typings";

const GET_ALL_CATEGORIES_LV_2 = gql`
  query ($filterCategoryLevel2: FilterCategoryLevel2, $page: Int, $size: Int) {
    getAllCategoryLevel2(
      filterCategoryLevel2: $filterCategoryLevel2
      page: $page
      size: $size
    ) {
      results {
        _id
        name
        image {
          medium
        }
        tagMenu {
          _id
          name
        }
      }
    }
  }
`;

export const getAllCategoryLv2 = async (variables: IGetAllCategoryLevel2) => {
  const response = await graphQLCommon(GET_ALL_CATEGORIES_LV_2, variables);
  return response;
};
