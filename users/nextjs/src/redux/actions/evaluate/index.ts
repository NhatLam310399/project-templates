import { IGetEvaluateByUserId } from "@common/typings";
import * as types from "@redux/types/evaluate";

export const getEvaluateByUserId = (payload: IGetEvaluateByUserId) => ({
  type: types.GET_EVALUATE_BY_USER_ID,
  payload,
});

export const getEvaluateByUserIdSuccess = <T>(payload: T) => ({
  type: types.GET_EVALUATE_BY_USER_ID_SUCCESS,
  payload,
});
