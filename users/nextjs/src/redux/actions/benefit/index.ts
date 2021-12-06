import * as types from "@redux/types/benefit";
import { IGetAllBenefit } from "@common/typings";

export const getAllBenefit = (payload: IGetAllBenefit) => ({
  type: types.GET_ALL_BENEFIT,
  payload,
});

export const getAllBenefitSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_BENEFIT_SUCCESS,
  payload,
});
