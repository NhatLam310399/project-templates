import * as types from "redux/types/categories";
import { IGetALlCategories } from "common/typings";
export const getAllCategories = (payload: IGetALlCategories) => ({
  type: types.GET_ALL_CATEGORIES,
  payload,
});
export const getAllCategoriesSuccess = (payload: IGetALlCategories) => ({
  type: types.GET_ALL_CATEGORIES_SUCCESS,
  payload,
});
