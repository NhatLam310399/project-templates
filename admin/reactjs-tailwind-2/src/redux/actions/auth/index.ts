/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from "redux/reducers/auth/actionTypes";
import { IGetToken } from "common/formatTypes";

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
