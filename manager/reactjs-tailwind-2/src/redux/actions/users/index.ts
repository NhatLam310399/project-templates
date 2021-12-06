import { IGetUserByID, IUpdateUserProfileInput } from "common/typings";
import * as types from "redux/types/users";

export const getUserById = (payload: IGetUserByID) => ({
  type: types.GET_USER_BY_ID,
  payload,
});
export const getUserSuccess = (payload: IGetUserByID) => ({
  type: types.GET_USER_SUCCESS,
  payload,
});
export const updateUserProfile = (payload: IUpdateUserProfileInput) => ({
  type: types.UPDATE_USER_PROFILE,
  payload,
});
