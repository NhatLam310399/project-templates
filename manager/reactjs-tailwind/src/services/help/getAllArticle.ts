import { IGetArticle } from "typings";
import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_ARTICAL = gql`
  query ($page: Int = 0, $filterArticle: FilterArticle) {
    getAllArticle(page: $page, filterArticle: $filterArticle) {
      results {
        _id
        title
        content
        slug
        keyword
        helpCenterLevel2 {
          _id
          nameCategoryLevel2
          helpCenterLevel1 {
            _id
            nameCategoryLevel1
            image {
              default
              small
              medium
            }
            slug
            keywords
          }
          description
          slug
          keyword
        }
      }
      totalCount
    }
  }
`;

export const getAllArticle = async (variables: IGetArticle) => {
  const response = await graphQLCommon(GET_ALL_ARTICAL, variables);
  return response;
};
