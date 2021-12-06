import * as types from "redux/types/location";
import { IGetWards, IUpdateWards } from "typings";

export const getWards = (payload: IGetWards) => ({
  type: types.GET_WARDS,
  payload,
});

export const getWardsSuccess = <T>(payload: T) => ({
  type: types.GET_WARDS_SUCCESS,
  payload,
});

export const updateWard = (payload: IUpdateWards) => ({
  type: types.UPDATE_WARD,
  payload,
});
