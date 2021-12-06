import { IGetCarrerCounseling } from "@common/typings";
import * as types from "@redux/types/careerCounseling";

export const getAllCareerCouseling = (payload: IGetCarrerCounseling) => ({
  type: types.GET_ALL_CARRER_COUSELING,
  payload,
});

export const getAllCareerCouselingSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CARRER_COUSELING_SUCCESS,
  payload,
});
