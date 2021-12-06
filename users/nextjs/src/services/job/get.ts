import { IGetAllJobType, IGetAllLevelPrice } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_JOB_TYPE = gql`
  query($filterJobType: FilterJobType, $page: Int, $size: Int) {
    getAllJobType(filterJobType: $filterJobType, page: $page, size: $size) {
      totalCount
      results {
        _id
        name
        slug
      }
    }
  }
`;

export const getAllJobType = async (variables: IGetAllJobType) => {
  const response = await graphQLCommon(GET_ALL_JOB_TYPE, variables);
  return response;
};

const GET_ALL_JOB_LEVEL = gql`
  query {
    getAllJobLevel {
      totalCount
      results {
        _id
        name
        slug
      }
    }
  }
`;

export const getAllJobLevel = async (variables: null) => {
  const response = await graphQLCommon(GET_ALL_JOB_LEVEL, variables);
  return response;
};

const GET_ALL_LEVEL_PRICE = gql`
  query($filterLevelPrice: FilterLevelPrice, $page: Int, $size: Int) {
    filterLevelPrice(
      filterLevelPrice: $filterLevelPrice
      page: $page
      size: $size
    ) {
      totalCount
      results {
        _id
        displayName
        priceFrom
        priceTo
        slug
        customSlug
      }
    }
  }
`;

export const getAllLevelPrice = async (variables: IGetAllLevelPrice) => {
  const response = await graphQLCommon(GET_ALL_LEVEL_PRICE, variables);
  return response;
};
