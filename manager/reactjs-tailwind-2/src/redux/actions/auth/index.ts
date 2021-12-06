import * as types from "redux/types/auth";
import { IGetToken } from "common/typings";

export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER,
});

export const getToken = (payload: IGetToken) => ({
  type: types.GET_TOKEN,
  payload,
});

export const refreshToken = () => ({
  type: types.REFRESH_TOKEN,
});

export const getTokenSuccess = <T>(payload: T) => ({
  type: types.GET_TOKEN_SUCCESS,
  payload,
});
