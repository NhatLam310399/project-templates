import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IById, ICreateCoupon, IGetCoupons, IUpdateCoupon } from "typings";

const GET_COUPONS = gql`
  query ($name: String, $page: Int, $size: Int) {
    getCoupons(name: $name, page: $page, size: $size) {
      totalCount
      results {
        _id
        name
        validTill
        couponCode
        discountValue
        status
        remainingCoupon
        usedCoupon
        description
        isPublic
        keywords
      }
    }
  }
`;

export const getCoupons = async (variables: IGetCoupons) => {
  const response = await graphQLCommon(GET_COUPONS, variables);
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
