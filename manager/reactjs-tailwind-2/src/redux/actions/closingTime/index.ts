import {
  IById,
  ICreateClosingTime,
  IGetAllClosingTime,
  IUpdateClosingTime,
} from "common/typings";

import * as types from "redux/types/closingTime";

export const getAllClosingTime = (payload: IGetAllClosingTime) => ({
  type: types.GET_ALL_CLOSING_TIME,
  payload,
});

export const getAllClosingTimeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CLOSING_TIME_SUCCESS,
  payload,
});
export const createClosingTime = (payload: ICreateClosingTime) => ({
  type: types.CREATE_CLOSING_TIME,
  payload,
});
export const updateClosingTime = (payload: IUpdateClosingTime) => ({
  type: types.UPDATE_CLOSING_TIME,
  payload,
});

export const deleteClosingTimeById = (payload: IById) => ({
  type: types.DELETE_CLOSING_TIME_BY_ID,
  payload,
});
