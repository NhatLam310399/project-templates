import * as types from "redux/types/location";
import {
  ICreateProvince,
  IDeleteProvince,
  IGetProvince,
  IUpdateProvince,
} from "common/typings";

export const getProvinces = (payload: IGetProvince) => ({
  type: types.GET_PROVINCES,
  payload,
});

export const getProvincesSuccess = <T>(payload: T) => ({
  type: types.GET_PROVINCE_SUCCESS,
  payload,
});

export const createProvince = (payload: ICreateProvince) => ({
  type: types.CREATE_PROVINCE,
  payload,
});
export const updateProvince = (payload: IUpdateProvince) => ({
  type: types.UPDATE_PROVINCE,
  payload,
});
export const deleteProvince = (payload: IDeleteProvince) => ({
  type: types.DELETE_PROVINCE,
  payload,
});
