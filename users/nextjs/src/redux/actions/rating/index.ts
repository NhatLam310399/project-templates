import { IGetRatingByUserId } from "@common/typings";
import * as types from "@redux/types/rating";

export const getRatingByUserId = (payload: IGetRatingByUserId) => ({
  type: types.GET_RATING_BY_USER_ID,
  payload,
});

export const getRatingByUserIdSuccess = <T>(payload: T) => ({
  type: types.GET_RATING_BY_USER_ID_SUCCESS,
  payload,
});
