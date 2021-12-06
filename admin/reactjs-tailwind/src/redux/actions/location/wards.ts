import * as types from "redux/types/location";
import {
  ICreateWards,
  IDeleteWard,
  IGetWards,
  IUpdateWards,
} from "common/typings";

export const getWards = (payload: IGetWards) => ({
  type: types.GET_WARDS,
  payload,
});

export const getWardsSuccess = <T>(payload: T) => ({
  type: types.GET_WARDS_SUCCESS,
  payload,
});

export const createWard = (payload: ICreateWards) => ({
  type: types.CREATE_WARD,
  payload,
});
export const updateWard = (payload: IUpdateWards) => ({
  type: types.UPDATE_WARD,
  payload,
});

export const deleteWard = (payload: IDeleteWard) => ({
  type: types.DELETE_WARD,
  payload,
});
