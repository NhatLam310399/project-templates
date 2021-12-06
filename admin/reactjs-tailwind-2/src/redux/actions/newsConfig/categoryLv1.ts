import * as types from "redux/types/newsConfig";
import {
    IGetAllCategoryLevel1,
    ICreateCategoryLevel1Input,
    IUpdateCategoryLevel1Input,
    IDeleteCategoryLevel1,
} from "common/formatTypes";

export const getAllCategoryLevel1 = (payload: IGetAllCategoryLevel1) => ({
    type: types.GET_ALL_CATEGORY_LEVEL1,
    payload,
});

export const getAllCategoryLevel1Success = <T>(payload: T) => ({
    type: types.GET_ALL_CATEGORY_LEVEL1_SUCCESS,
    payload,
});

export const createCategoryLevel1 = (payload: ICreateCategoryLevel1Input) => ({
    type: types.CREATE_CATEGORY_LEVEL1,
    payload,
});
export const updateCategoryLevel1 = (payload: IUpdateCategoryLevel1Input) => ({
    type: types.UPDATE_CATEGORY_LEVEL1,
    payload,
});
export const deleteCategoryLevel1 = (payload: IDeleteCategoryLevel1) => ({
    type: types.DELETE_CATEGORY_LEVEL1,
    payload,
});
