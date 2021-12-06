import * as types from "redux/types/clipArt";
import { IGetAllCategory, IGetAllClipArt } from "typings";

export const getAllCategory = (payload: IGetAllCategory) => ({
  type: types.GET_ALL_CATEGORY,
  payload,
});
export const getAllCategorySuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CATEGORY_SUCCESS,
  payload,
});

export const getAllClipArt = (payload: IGetAllClipArt) => ({
  type: types.GET_ALL_CLIP_ART,
  payload,
});
export const getAllClipArtSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CLIP_ART_SUCCESS,
  payload,
});
