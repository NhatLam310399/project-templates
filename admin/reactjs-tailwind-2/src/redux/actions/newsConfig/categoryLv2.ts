import * as types from "redux/types/newsConfig";
import {
    ICreateCategoryLv2,
    IDeleteCategoryLv2ById,
    IGetCategoryLv2,
    IUpdateCategoryLv2,
} from "common/formatTypes";

export const getAllCategoryLevel2 = (payload: IGetCategoryLv2) => ({
    type: types.GET_ALL_CATEGORY_LEVEL_2,
    payload,
});

export const getAllCategoryLevel2Success = <T>(payload: T) => ({
    type: types.GET_ALL_CATEGORY_LEVEL_2_SUCCESS,
    payload,
});

export const deleteCategoryLevel2 = (payload: IDeleteCategoryLv2ById) => ({
    type: types.DELETE_CATEGORY_LEVEL_2,
    payload,
});

export const updateCategoryLevel2 = (payload: IUpdateCategoryLv2) => ({
    type: types.UPDATE_CATEGORY_LEVEL_2,
    payload,
});

export const createCategoryLevel2 = (payload: ICreateCategoryLv2) => ({
    type: types.CREATE_CATEGORY_LEVEL_2,
    payload,
});
