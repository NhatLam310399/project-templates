import { IGetBySlug, IGetAllPages } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";

const GET_ALL_STATIC_PAGES = gql`
  query($filterPages: FilterPages, $page: Int, $size: Int) {
    getAllPages(filterPages: $filterPages, page: $page, size: $size) {
      totalCount
      results {
        _id
        name
        type {
          name
          _id
          slug
        }
        content
        slug
        url
        image {
          default
          small
          medium
        }
      }
    }
  }
`;

export const getAllPages = async (variables: IGetAllPages) => {
  const response = await graphQLCommon(GET_ALL_STATIC_PAGES, variables);
  return response;
};

const GET_STATIC_PAGE_BY_SLUG = gql`
  query($slug: String!) {
    getPagesBySlug(slug: $slug) {
      _id
      name
      type {
        name
        _id
        slug
      }
      content
      url
      image {
        default
        small
        medium
      }
    }
  }
`;

export const getPagesBySlug = async (variables: IGetBySlug) => {
  const response = await graphQLCommon(GET_STATIC_PAGE_BY_SLUG, variables);
  return response;
};
