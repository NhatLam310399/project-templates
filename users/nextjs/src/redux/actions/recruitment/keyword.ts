import * as types from "@redux/types/recruitment";

export const getAllMostKeyword = () => ({
  type: types.GET_MOST_KEYWORD,
});

export const getAllMostKeywordSuccess = <T>(payload: T) => ({
  type: types.GET_MOST_KEYWORD_SUCCESS,
  payload,
});
