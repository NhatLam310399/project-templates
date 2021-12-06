import * as types from "@redux/types/tag";
import { IGetTag } from "@common/typings";

export const getAllTag = (payload: IGetTag) => ({
  type: types.GET_ALL_TAG,
  payload,
});

export const getAllTagSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_TAG_SUCCESS,
  payload,
});
