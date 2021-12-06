import * as types from "redux/types/location";
import {
    ICreateDistrict,
    IDeleteDistrict,
    IGetDistricts,
    IUpdateDistrict,
} from "common/formatTypes";

export const getDistricts = (payload: IGetDistricts) => ({
    type: types.GET_DISTRICTS,
    payload,
});

export const getDistrictsSuccess = <T>(payload: T) => ({
    type: types.GET_DISTRICTS_SUCCESS,
    payload,
});

export const updateDistrict = (payload: IUpdateDistrict) => ({
    type: types.UPDATE_DISTRICT,
    payload,
});

export const createDistrict = (payload: ICreateDistrict) => ({
    type: types.CREATE_DISTRICT,
    payload,
});
export const clearDistricts = (payload: IDeleteDistrict) => ({
    type: types.CLEAR_DISTRICTS,
    payload,
});
