import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";
import { IGetAllBlog, IGetBlogBySlug } from "@common/typings";

const GET_ALL_Blog = gql`
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
        }
        slug
        createdAt
      }
    }
  }
`;

export const getAllBlog = async (variables: IGetAllBlog) => {
  const response = await graphQLCommon(GET_ALL_Blog, variables);
  return response;
};

const GET_BLOG_BY_SLUG = gql`
  query Query($slug: String!) {
    getCareerCounselingBySlug(slug: $slug) {
      _id
      name
      description
      content
      urlImage {
        default
        medium
        small
      }
      code
      highlight
      enabled
      category {
        name
      }
      tags {
        name
      }
      slug
      keywords
      createdAt
    }
  }
`;

export const getBlogBySlug = async (variables: IGetBlogBySlug) => {
  const response = await graphQLCommon(GET_BLOG_BY_SLUG, variables);
  return response;
};
