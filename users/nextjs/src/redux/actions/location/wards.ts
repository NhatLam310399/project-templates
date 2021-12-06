import * as types from "@redux/types/location";
import { IGetWards } from "@common/typings";

export const getWards = (payload: IGetWards) => ({
  type: types.GET_WARDS,
  payload,
});

export const getWardsSuccess = <T>(payload: T) => ({
  type: types.GET_WARDS_SUCCESS,
  payload,
});
