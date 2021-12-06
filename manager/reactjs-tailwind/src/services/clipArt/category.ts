import { gql } from "apollo-boost";
import {
  IGetAllCategory
} from "typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_CATEGORY = gql`
  query Results($filterCategory: FilterCategory, $page: Int, $size: Int) {
  getAllCategory(filterCategory: $filterCategory, page: $page, size: $size) {
    results {
      _id
      name
      code
      description
      tags
      isPro
    }
  }
}
`;
export const getAllCategory = async (variables: IGetAllCategory) => {
  const result = await graphQLCommon(GET_ALL_CATEGORY, variables);
  return result;
};
