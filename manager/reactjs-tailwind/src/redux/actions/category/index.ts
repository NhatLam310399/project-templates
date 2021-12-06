import {
  ICategoryLevel1,
  ICategoryLevel2,
  IGetAllCategoryLevel1,
  IGetAllCategoryLevel2,
  IGetAllTagMenu,
  ITagMenu,
} from "typings";
import * as types from "redux/types/category";

export const getAllCategoryLv1 = (payload: IGetAllCategoryLevel1) => ({
  type: types.GET_ALL_CATEGORY_LV1,
  payload,
});

export const getAllCategoryLv1Success = (payload: IGetAllCategoryLevel1) => ({
  type: types.GET_ALL_CATEGORY_LV1_SUCCESS,
  payload,
});

export const getAllCategoryLv2 = (payload: IGetAllCategoryLevel2) => ({
  type: types.GET_ALL_CATEGORY_LV2,
  payload,
});

export const getAllCategoryLv2Success = (payload: IGetAllCategoryLevel2) => ({
  type: types.GET_ALL_CATEGORY_LV2_SUCCESS,
  payload,
});

export const getAllTagMenu = (payload: IGetAllTagMenu) => ({
  type: types.GET_ALL_TAG_MENU,
  payload,
});

export const getAllTagMenuSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_TAG_MENU_SUCCESS,
  payload,
});

export const setCategoryLevel1Selected = (payload: ICategoryLevel1 | null) => ({
  type: types.SET_CATEGORY_LV_1_SELECTED,
  payload,
});

export const setTagMenuSelected = (payload: ITagMenu | null) => ({
  type: types.SET_TAG_MENU_SELECTED,
  payload,
});

export const setCategoryLevel2Selected = (payload: ICategoryLevel2 | null) => ({
  type: types.SET_CATEGORY_LV_2_SELECTED,
  payload,
});
