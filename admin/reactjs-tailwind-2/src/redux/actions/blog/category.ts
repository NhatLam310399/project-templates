import {
    IGetById,
    ICreateCategory,
    IUpdateCategory,
    IGetAllCategory,
} from "common/formatTypes";
import * as types from "redux/types/blog";

export const getAllCategory = (payload: IGetAllCategory) => ({
    type: types.GET_ALL_CATEGORY,
    payload,
});

export const getAllCategorySuccess = <T>(payload: T) => ({
    type: types.GET_ALL_CATEGORY_SUCCESS,
    payload,
});

export const createCategory = (payload: ICreateCategory) => ({
    type: types.CREATE_CATEGORY,
    payload,
});

export const updateCategory = (payload: IUpdateCategory) => ({
    type: types.UPDATE_CATEGORY,
    payload,
});

export const deleteCategory = (payload: IGetById) => ({
    type: types.DELETE_CATEGORY,
    payload,
});
