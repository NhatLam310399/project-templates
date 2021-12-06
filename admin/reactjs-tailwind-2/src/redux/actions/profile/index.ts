import { IById, IUpdateUserProfile } from "common/formatTypes";
import * as types from "redux/types/profile";

export const getProfile = (payload: IById) => ({
    type: types.GET_PROFILE,
    payload,
});

export const getProfileSuccess = <T>(payload: T) => ({
    type: types.GET_PROFILE_SUCCESS,
    payload,
});

export const removeProfile = () => ({
    type: types.REMOVE_PROFILE,
});

export const updateUserProfile = (payload: IUpdateUserProfile) => ({
    type: types.UPDATE_USER_PROFILE,
    payload,
});
