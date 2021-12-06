import * as types from "redux/types/location";
import {
  ICreateDistrict,
  IDeleteDistrict,
  IGetDistricts,
  IUpdateDistrict,
} from "common/typings";

export const getDistricts = (payload: IGetDistricts) => ({
  type: types.GET_DISTRICTS,
  payload,
});

export const getDistrictsSuccess = <T>(payload: T) => ({
  type: types.GET_DISTRICTS_SUCCESS,
  payload,
});

export const createDistrict = (payload: ICreateDistrict) => ({
  type: types.CREATE_DISTRICT,
  payload,
});
export const updateDistrict = (payload: IUpdateDistrict) => ({
  type: types.UPDATE_DISTRICT,
  payload,
});

export const deleteDistrict = (payload: IDeleteDistrict) => ({
  type: types.DELETE_DISTRICT,
  payload,
});
