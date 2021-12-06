import { IGetHelpCenterLevel1 } from "typings";
import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_HELP_CENTER_TYPE = gql`
  query ($page: Int = 0, $size: Int = 15) {
    getAllHelpCenterLevel1(page: $page, size: $size) {
      results {
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
      totalCount
    }
  }
`;

export const getAllHelpCenterLevel1 = async (
  variables: IGetHelpCenterLevel1,
) => {
  const response = await graphQLCommon(GET_ALL_HELP_CENTER_TYPE, variables);
  return response;
};
