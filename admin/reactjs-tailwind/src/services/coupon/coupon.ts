import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
  IById,
  ICreateCoupon,
  IGetCoupons,
  IUpdateCoupon,
} from "common/typings";

const GET_PUBLIC_COUPONS = gql`
  query ($name: String, $page: Int, $size: Int) {
    getPublicCoupons(name: $name, page: $page, size: $size) {
      totalCount
      results {
        _id
        name
        couponCode
        startDate
        validTill
        remainingCoupon
        type
        discountPercent
        discountValue
        discountBooking
        status
        usedCoupon
        description
        isPublic
        keywords
        slug
        point
        image {
          small
          default
        }
      }
    }
  }
`;

export const getPublicCoupons = async (variables: IGetCoupons) => {
  const response = await graphQLCommon(GET_PUBLIC_COUPONS, variables);
  return response;
};

const CREATE_COUPON = gql`
  mutation ($createCouponInput: CreateCouponInput!) {
    createCoupon(createCouponInput: $createCouponInput) {
      _id
      name
    }
  }
`;

export const createCoupon = async (variables: ICreateCoupon) => {
  const response = await graphQLCommon(CREATE_COUPON, variables);
  return response;
};

const UPDATE_COUPON = gql`
  mutation ($id: String!, $updateCouponInput: UpdateCouponInput!) {
    updateCoupon(id: $id, updateCouponInput: $updateCouponInput) {
      _id
      name
    }
  }
`;

export const updateCoupon = async (variables: IUpdateCoupon) => {
  const response = await graphQLCommon(UPDATE_COUPON, variables);
  return response;
};

const DELETE_COUPON = gql`
  mutation ($id: String!) {
    deleteCoupon(id: $id)
  }
`;

export const deleteCoupon = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_COUPON, variables);
  return result;
};
