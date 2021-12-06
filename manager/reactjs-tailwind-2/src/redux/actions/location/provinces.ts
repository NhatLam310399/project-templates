import * as types from "redux/types/location";
import { IGetProvince, IUpdateProvince } from "common/typings";

export const getProvinces = (payload: IGetProvince) => ({
  type: types.GET_PROVINCES,
  payload,
});

export const getProvincesSuccess = <T>(payload: T) => ({
  type: types.GET_PROVINCE_SUCCESS,
  payload,
});

export const updateProvince = (payload: IUpdateProvince) => ({
  type: types.UPDATE_PROVINCE,
  payload,
});
