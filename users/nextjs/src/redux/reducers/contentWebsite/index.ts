import produce from "immer";
import * as types from "@redux/types/contentWebsite";
import { IContentWebsite, ISEO } from "@common/typings";

export interface IContentWebsiteState {
  contentWebsite: IContentWebsite;
  seoData: ISEO;
}

let initialState: IContentWebsiteState = {
  contentWebsite: {},
  seoData: {},
};

export default (state = initialState, actions: any) => {
  return produce(state, (draft) => {
    switch (actions.type) {
      case types.GET_CONTENT_WEBSITE_SUCCESS:
        draft.contentWebsite = actions.payload.results[0];
        break;
      case types.GET_SEO_WEBSITE_SUCCESS:
        draft.seoData = actions.payload;
        break;
    }
  });
};
