import { IGetCarrerCounseling } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_CAREER_COUNSELING = gql`
  query(
    $filterCareerCounseling: FilterCareerCounseling
    $page: Int
    $size: Int
  ) {
    getAllCareerCounseling(
      filterCareerCounseling: $filterCareerCounseling
      page: $page
      size: $size
    ) {
      results {
        _id
        name
        description
        content
        urlImage {
          default
          medium
          small
        }
        slug
      }
      totalCount
    }
  }
`;

export const getAllCarreerCounseling = async (
  variable: IGetCarrerCounseling,
) => {
  const response = await graphQLCommon(GET_ALL_CAREER_COUNSELING, variable);
  return response;
};
