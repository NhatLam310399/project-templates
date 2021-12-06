import * as types from "redux/types/auth";
import { IAccount, ILogin, IGetById, IGetToken } from "typings";

export const getToken = (payload: IGetToken) => ({
  type: types.GET_TOKEN,
  payload,
});

export const getTokenSuccess = <T>(payload: T) => ({
  type: types.GET_TOKEN_SUCCESS,
  payload,
});

export const login = (payload: ILogin) => ({
  type: types.LOGIN,
  payload,
});
export const loginSuccess = (payload: IAccount) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER,
});

export const getAccountProfile = (payload: IGetById) => ({
  type: types.GET_ACCOUNT_PROFILE,
  payload,
});

export const getAccountProfileSuccess = <T>(payload: T) => ({
  type: types.GET_ACCOUNT_PROFILE_SUCCESS,
  payload,
});

export const refreshToken = () => ({
  type: types.REFRESH_TOKEN,
});

export const refreshTokenSuccess = <T>(payload: T) => ({
  type: types.REFRESH_TOKEN_SUCCESS,
  payload,
});
