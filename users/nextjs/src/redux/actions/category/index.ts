import {
  ICategoryLevel2,
  IGetCategoryLevel1,
  IGetCategoryLevel2,
} from "@common/typings";
import * as types from "@redux/types/category";

export const getAllCategory = () => ({
  type: types.GET_ALL_CATEGORY,
});

export const getAllCategorySuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CATEGORY_SUCCESS,
  payload,
});

export const getAllCategoryLevel1 = (payload: IGetCategoryLevel1) => ({
  type: types.GET_ALL_CATEGORY_1_JOB,
  payload,
});

export const getAllCategoryLevel1Success = <T>(payload: T) => ({
  type: types.GET_ALL_CATEGORY_1_JOB_SUCCESS,
  payload,
});

export const getAllCategoryLevel2 = (payload: IGetCategoryLevel2) => ({
  type: types.GET_ALL_CATEGORY_2_JOB,
  payload,
});

export const getAllCategoryLevel2Success = <T>(payload: T) => ({
  type: types.GET_ALL_CATEGORY_2_JOB_SUCCESS,
  payload,
});

export const setCategorySelected = (payload: ICategoryLevel2) => ({
  type: types.SET_CATEGORY_SELECTED,
  payload,
});
