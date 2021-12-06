import produce from "immer";
import * as types from "@redux/types/staticPages";
import { AnyAction } from "redux";
import { IStaticPage } from "@common/typings";

interface IStaticPageState {
  allStaticPages: {
    results: IStaticPage[];
    totalCount: number;
  };
  staticPageDetail: IStaticPage | null;
}

const initialState: IStaticPageState = {
  allStaticPages: {
    results: [],
    totalCount: 0,
  },
  staticPageDetail: null,
};

const staticPages = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_STATIC_PAGES_SUCCESS:
        draft.allStaticPages = action.payload;
        break;
      case types.GET_STATIC_PAGE_BY_SLUG_SUCCESS:
        draft.staticPageDetail = action.payload;
        break;
    }
  });

export default staticPages;
