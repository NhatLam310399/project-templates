import {
    IGetAllKeyword,
    ICreateKeyword,
    IUpdateKeyword,
    IDeleteKeyword,
} from "common/formatTypes";
import * as types from "redux/types/newsConfig";

export const getAllKeyword = (payload: IGetAllKeyword) => ({
    type: types.GET_ALL_KEYWORD,
    payload,
});

export const getAllKeywordSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_KEYWORD_SUCCESS,
    payload,
});

export const updateKeyword = (payload: IUpdateKeyword) => ({
    type: types.UPDATE_KEYWORD,
    payload,
});

export const createKeyword = (payload: ICreateKeyword) => ({
    type: types.CREATE_KEYWORD,
    payload,
});

export const deleteKeyword = (payload: IDeleteKeyword) => ({
    type: types.DELETE_KEYWORD,
    payload,
});
