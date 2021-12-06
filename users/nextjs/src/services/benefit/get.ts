import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetAllBenefit } from "@common/typings";

const GET_ALL_BENEFIT = gql`
  query Query($filterBenefit: FilterBenefit, $page: Int, $size: Int) {
    getAllBenefit(filterBenefit: $filterBenefit, page: $page, size: $size) {
      results {
        _id
        icon {
          default
          medium
          small
        }
        name
        description
        keywords
      }
      totalCount
    }
  }
`;

export const getAllBenefit = async (variables: IGetAllBenefit) => {
  const response = await graphQLCommon(GET_ALL_BENEFIT, variables);
  return response;
};
