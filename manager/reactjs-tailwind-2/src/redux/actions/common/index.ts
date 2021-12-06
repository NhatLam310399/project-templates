import * as types from "redux/types/common";
import { ILoading } from "common/typings";

export const actionSuccess = () => ({
  type: types.ACTION_SUCCESS,
});

export const resetAction = () => ({
  type: types.RESET_ACTION,
});

export const setLoading = (payload: boolean) => ({
  type: types.SET_LOADING,
  payload,
});

export const loading = (payload: ILoading) => ({
  type: types.LOADING,
  payload,
});

export const setProgress = (payload: number) => ({
  type: types.SET_PROGRESS,
  payload,
});
