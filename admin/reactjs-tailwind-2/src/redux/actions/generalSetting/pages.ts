/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from "redux/types/generalSetting";
import {
    ICreatePagesInput,
    IRemoveStaticPages,
    IUpdatePagesInput,
    IGetAllPages,
} from "common/formatTypes";

export const getAllPages = (payload: IGetAllPages) => ({
    type: types.GET_ALL_PAGES,
    payload,
});

export const getAllPagesSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_PAGES_SUCCESS,
    payload,
});

export const createPages = (payload: ICreatePagesInput) => ({
    type: types.CREATE_PAGES,
    payload,
});

export const updatePages = (payload: IUpdatePagesInput) => ({
    type: types.UPDATE_PAGES,
    payload,
});

export const removePages = (payload: IRemoveStaticPages) => ({
    type: types.REMOVE_PAGES,
    payload,
});
