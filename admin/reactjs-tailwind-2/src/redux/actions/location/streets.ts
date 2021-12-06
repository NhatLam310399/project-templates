import * as types from "redux/types/location";
import {
    IGetStreet,
    IUpdateStreet,
    ICreateStreet,
    IDeleteStreet,
    IGetById,
} from "common/formatTypes";

// street
export const getStreetsByWardId = (payload: IGetStreet) => ({
    type: types.GET_STREETS_BY_WARD_ID,
    payload,
});

export const getStreetsSuccess = <T>(payload: T) => ({
    type: types.GET_STREETS_SUCCESS,
    payload,
});

export const getStreetById = (payload: IGetById) => ({
    type: types.GET_STREET_BY_ID,
    payload,
});

export const getStreetSuccess = <T>(payload: T) => ({
    type: types.GET_STREET_SUCCESS,
    payload,
});

export const createStreet = (payload: ICreateStreet) => ({
    type: types.CREATE_STREET,
    payload,
});

export const updateStreet = (payload: IUpdateStreet) => ({
    type: types.UPDATE_STREET,
    payload,
});

export const deleteStreet = (payload: IDeleteStreet) => ({
    type: types.DELETE_STREET,
    payload,
});
