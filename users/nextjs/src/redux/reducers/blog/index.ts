import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/blog";
import { IBlog } from "@common/typings";

interface BlogReducer {
  allBlog: {
    results: IBlog[];
    totalCount: number;
    loading: boolean;
  };
  blog: IBlog | null;
}

const initialState: BlogReducer = {
  allBlog: {
    results: [],
    totalCount: 0,
    loading: true,
  },
  blog: null,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_BLOG_SUCCESS:
        draft.allBlog = { ...action.payload, loading: false };
        break;
      case types.GET_BLOG_BY_SLUG_SUCCESS:
        draft.blog = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
