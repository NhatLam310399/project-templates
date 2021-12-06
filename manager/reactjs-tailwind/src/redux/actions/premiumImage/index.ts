import * as types from "redux/types/premiumImage";
import { IGetAllPremiumImage } from "typings";

export const getAllPremium = (payload: IGetAllPremiumImage) => ({
  type: types.GET_ALL_PREMIUM_IMAGE,
  payload,
});

export const getAllPremiumSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_PREMIUM_IMAGE_SUCCESS,
  payload,
});
