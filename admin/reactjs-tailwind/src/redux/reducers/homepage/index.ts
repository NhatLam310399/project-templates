import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/homepage";
import { IHomePage } from "common/typings";

interface IHomePageState {
  homepage: IHomePage | null;
}

const initialState: IHomePageState = {
  homepage: null,
};

const homepageReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_HOME_PAGE_SUCCESS:
        draft.homepage = action.payload;
        break;
      default:
        break;
    }
  });

export default homepageReducer;
