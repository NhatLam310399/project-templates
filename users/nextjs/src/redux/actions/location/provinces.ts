import { IProvince } from "@common/typings";
import * as types from "@redux/types/location";

export const getProvinces = () => ({
  type: types.GET_PROVINCES,
});

export const getProvincesSuccess = <T>(payload: T) => ({
  type: types.GET_PROVINCE_SUCCESS,
  payload,
});

export const setProvinceSelected = (payload: IProvince) => ({
  type: types.SET_PROVINCE_SELECTED,
  payload,
});
