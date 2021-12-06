import { IHelpCenterLevel1, IHelpCenterLevel2, IArticle } from "typings/Help";

import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/help";

export interface ILink {
  title: string;
  link: string;
}
export interface IHelpState {
  listHelpCenterLevel1: IHelpCenterLevel1[];
  listHelpCenterLevel2: IHelpCenterLevel2[];
  listArticle: IArticle[];
  listSearchArticle: IArticle[];
  linkPrev: ILink[];
}

const initialState: IHelpState = {
  listHelpCenterLevel1: [],
  listHelpCenterLevel2: [],
  listArticle: [],
  listSearchArticle: [],
  linkPrev: [],
};

const helpReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_HELP_CENTER_LEVEL1_SUCCESS:
        draft.listHelpCenterLevel1 = action.payload;
        break;
      case types.GET_ALL_HELP_CENTER_LEVEL2_SUCCESS:
        draft.listHelpCenterLevel2 = action.payload;
        break;
      case types.GET_ALL_ARTICLE_SUCCESS:
        draft.listArticle = action.payload;
        break;
      case types.SEARCH_ALL_ARTICLE_SUCCESS:
        draft.listSearchArticle = action.payload;
        break;

      case types.ADD_TITLE_LINK:
        console.log(action);
        draft.linkPrev = action.payload;
        break;
      default:
        return draft;
    }
  });

export default helpReducer;
