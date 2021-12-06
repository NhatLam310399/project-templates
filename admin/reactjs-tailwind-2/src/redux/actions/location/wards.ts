import * as types from "redux/types/location";
import { ICreateWards, IGetWards, IUpdateWards } from "common/formatTypes";

export const getWards = (payload: IGetWards) => ({
    type: types.GET_WARDS,
    payload,
});

export const clearWards = (payload: {}) => ({
    type: types.CLEAR_WARDS,
    payload,
});

export const getWardsSuccess = <T>(payload: T) => ({
    type: types.GET_WARDS_SUCCESS,
    payload,
});

export const updateWard = (payload: IUpdateWards) => ({
    type: types.UPDATE_WARD,
    payload,
});
export const createWard = (payload: ICreateWards) => ({
    type: types.CREATE_WARD,
    payload,
});
