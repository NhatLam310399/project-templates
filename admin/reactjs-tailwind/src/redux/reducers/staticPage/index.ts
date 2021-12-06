import producer from "immer";
import { AnyAction } from "redux";
import { IStaticPage } from "common/typings";
import * as types from "redux/types/staticPage";

interface IStaticPageState {
  staticPages: IStaticPage[];
}
const initialState: IStaticPageState = {
  staticPages: [],
};

const staticPageReducer = (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ALL_PAGES_SUCCESS:
        draft.staticPages = actions.payload;
        break;
      default:
        break;
    }
  });

export default staticPageReducer;
