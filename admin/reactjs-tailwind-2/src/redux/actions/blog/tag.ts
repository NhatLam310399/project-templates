import {
    IGetById,
    ICreateTag,
    IUpdateTag,
    IGetAllTag,
} from "common/formatTypes";
import * as types from "redux/types/blog";

export const getAllTag = (payload: IGetAllTag) => ({
    type: types.GET_ALL_TAG,
    payload,
});

export const getAllTagSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_TAG_SUCCESS,
    payload,
});

export const createTag = (payload: ICreateTag) => ({
    type: types.CREATE_TAG,
    payload,
});

export const updateTag = (payload: IUpdateTag) => ({
    type: types.UPDATE_TAG,
    payload,
});

export const deleteTag = (payload: IGetById) => ({
    type: types.DELETE_TAG,
    payload,
});
