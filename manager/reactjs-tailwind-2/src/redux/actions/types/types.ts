import * as types from "redux/types/types";
import {
  IById,
  IGetTypesByCode,
  ICreateTypes,
  IUpdateTypes,
} from "common/typings";

export const getTypesByCode = (payload: IGetTypesByCode) => ({
  type: types.GET_TYPES_BY_CODE,
  payload,
});

export const getTypesByCodeSuccess = (payload: IGetTypesByCode) => ({
  type: types.GET_TYPES_BY_CODE_SUCCESS,
  payload,
});

export const createTypes = (payload: ICreateTypes) => ({
  type: types.CREATE_TYPES,
  payload,
});

export const updateTypes = (payload: IUpdateTypes) => ({
  type: types.UPDATE_TYPES,
  payload,
});

export const removeTypes = (payload: IById) => ({
  type: types.REMOVE_TYPES,
  payload,
});
