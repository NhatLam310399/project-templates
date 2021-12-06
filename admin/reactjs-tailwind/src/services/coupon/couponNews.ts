import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
  IById,
  ICreateCouponNews,
  IGetAllCouponNews,
  IUpdateCouponNews,
} from "common/typings";

const GET_ALL_COUPON_NEWS = gql`
  query ($filterCouponNews: FilterCouponNews, $page: Int, $size: Int) {
    getAllCouponNews(
      filterCouponNews: $filterCouponNews
      page: $page
      size: $size
    ) {
      totalCount
      results {
        _id
        name
        description
        keywords
        createdAt
        expireDate
        image {
          default
          small
        }
      }
    }
  }
`;

export const getAllCouponNews = async (variables: IGetAllCouponNews) => {
  const response = await graphQLCommon(GET_ALL_COUPON_NEWS, variables);
  return response;
};

const CREATE_COUPON_NEWS = gql`
  mutation ($couponNewsCreateInput: CouponNewsCreateInput!) {
    createCouponNews(couponNewsCreateInput: $couponNewsCreateInput) {
      _id
      name
    }
  }
`;

export const createCouponNews = async (variables: ICreateCouponNews) => {
  const response = await graphQLCommon(CREATE_COUPON_NEWS, variables);
  return response;
};

const UPDATE_COUPON_NEWS = gql`
  mutation ($id: String!, $couponNewsUpdateInput: CouponNewsUpdateInput!) {
    updateCouponNews(id: $id, couponNewsUpdateInput: $couponNewsUpdateInput) {
      _id
      name
    }
  }
`;

export const updateCouponNews = async (variables: IUpdateCouponNews) => {
  const response = await graphQLCommon(UPDATE_COUPON_NEWS, variables);
  return response;
};

const DELETE_COUPON_NEWS_BY_ID = gql`
  mutation ($id: String!) {
    deleteCouponNewsById(id: $id)
  }
`;

export const deleteCouponNewsById = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_COUPON_NEWS_BY_ID, variables);
  return result;
};
