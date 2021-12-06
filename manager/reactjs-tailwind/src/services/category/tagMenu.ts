import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IGetAllTagMenu } from "typings";

const GET_ALL_TAG_MENU = gql`
  query ($filterTagMenu: FilterTagMenu, $page: Int, $size: Int) {
    getAllTagMenu(filterTagMenu: $filterTagMenu, page: $page, size: $size) {
      results {
        _id
        name
        hasCategoryLevel2
        categoryLevel1 {
          _id
        }
        image {
          medium
        }
      }
    }
  }
`;

export const getAllTagMenu = async (variables: IGetAllTagMenu) => {
  const response = await graphQLCommon(GET_ALL_TAG_MENU, variables);
  return response;
};
