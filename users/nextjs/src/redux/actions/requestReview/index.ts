import {
  ICreateRequestReviewInput,
  IGetAllRequestReview,
  IGetByUserId,
} from "@common/typings";
import * as types from "@redux/types/requestReview";

export const getAllRequestReview = (payload: IGetAllRequestReview) => ({
  type: types.GET_ALL_REQUEST_REVIEW,
  payload,
});

export const getAllRequestReviewSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_REQUEST_REVIEW_SUCCESS,
  payload,
});

export const getEvaluateByUser = (payload: IGetByUserId) => ({
  type: types.GET_EVALUATE_BY_USER,
  payload,
});

export const getEvaluateByUserSuccess = <T>(payload: T) => ({
  type: types.GET_EVALUATE_BY_USER_SUCCESS,
  payload,
});

export const createRequestReview = (payload: ICreateRequestReviewInput) => {
  return {
    type: types.CREATE_REQUEST_REVIEW,
    payload,
  };
};
