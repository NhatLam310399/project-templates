import { IGetUser, IUpdateUserInput } from "@common/typings";
import * as types from "@redux/types/user";

export const updateUserProfile = (payload: IUpdateUserInput) => ({
  type: types.UPDATE_USER_PROFILE,
  payload,
});

export const getUserProfile = (payload: IGetUser) => ({
  type: types.GET_USER_PROFILE,
  payload,
});

export const getUserProfileSuccess = <T>(payload: T) => ({
  type: types.GET_USER_PROFILE_SUCCESS,
  payload,
});

