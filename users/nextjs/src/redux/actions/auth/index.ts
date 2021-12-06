import * as types from "@redux/types/auth";

import {
  IAccount,
  ICreateUserInput,
  IGetToken,
  ILoginInput,
  IResetPasswordInput,
  IUpdateAccount,
} from "@common/typings";

export const getToken = (payload: IGetToken) => ({
  type: types.GET_TOKEN,
  payload,
});

export const getTokenSuccess = <T>(payload: T) => ({
  type: types.GET_TOKEN_SUCCESS,
  payload,
});

export const login = (payload: ILoginInput) => ({
  type: types.LOGIN,
  payload,
});

export const loginSuccess = <T>(payload: T) => ({
  type: types.LOGIN_SUCCESS,
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

export const createCandidate = (payload: ICreateUserInput) => ({
  type: types.CREATE_CANDIDATE,
  payload,
});

export const resetPassword = (payload: IResetPasswordInput) => ({
  type: types.RESET_PASSWORD,
  payload,
});

export const getCurrentUser = (payload: IAccount) => ({
  type: types.GET_CURRENT_USER,
  payload,
});

export const updateUserEmailPassword = (payload: IUpdateAccount) => ({
  type: types.UPDATE_ACCOUNT,
  payload,
});
