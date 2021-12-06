import { IGetHelpCenterLevel2 } from "typings";
import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_HELP_CENTER = gql`
  query getAllHelpCenterLevel2(
    $page: Int = 0
    $filterHelpCenterLevel2: FilterHelpCenterLevel2
  ) {
    getAllHelpCenterLevel2(
      page: $page
      filterHelpCenterLevel2: $filterHelpCenterLevel2
    ) {
      results {
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
      totalCount
    }
  }
`;

export const getAllHelpCenterLevel2 = async (
  variables: IGetHelpCenterLevel2,
) => {
  const response = await graphQLCommon(GET_ALL_HELP_CENTER, variables);
  return response;
};
