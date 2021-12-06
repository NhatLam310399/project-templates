import * as types from "redux/types/location";
import {
    IGetProvince,
    IUpdateProvince,
    IMongoObjectId,
} from "common/formatTypes";

export const getProvinces = (payload: IGetProvince) => ({
    type: types.GET_PROVINCES,
    payload,
});
export const getSuggestionProvinces = (payload: IGetProvince) => ({
    type: types.GET_SUGGESTION_PROVINCES,
    payload,
});

export const getProvincesSuccess = <T>(payload: T) => ({
    type: types.GET_PROVINCE_SUCCESS,
    payload,
});

export const getSuggestionProvincesSuccess = <T>(payload: T) => ({
    type: types.GET_SUGGESTION_PROVINCES_SUCCESS,
    payload,
});

export const updateProvince = (payload: IUpdateProvince) => ({
    type: types.UPDATE_PROVINCE,
    payload,
});
