import * as types from "redux/reducers/auth/actionTypes";
import { IGetToken } from "common/typings";

export const actionRemoveCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER,
});

export const getToken = (payload: IGetToken) => ({
  type: types.GET_TOKEN,
  payload,
});

export const getTokenSuccess = <T>(payload: T) => ({
  type: types.GET_TOKEN_SUCCESS,
  payload,
});

export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER,
});

export const refreshToken = () => ({
  type: types.REFRESH_TOKEN,
});

export const refreshTokenSuccess = <T>(payload: T) => ({
  type: types.REFRESH_TOKEN_SUCCESS,
  payload,
});
