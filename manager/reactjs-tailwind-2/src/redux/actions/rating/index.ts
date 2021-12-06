import * as types from "redux/types/rating";
import { IGetAllRating } from "common/typings";

export const getAllRating = (payload: IGetAllRating) => ({
  type: types.GET_ALL_RATING,
  payload,
});

export const getAllRatingSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_RATING_SUCCESS,
  payload,
});
