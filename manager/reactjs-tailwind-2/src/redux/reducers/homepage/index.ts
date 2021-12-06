import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/homepage";
import { IHomePageManager } from "common/typings";

interface IHomePageManagerState {
  homepage: IHomePageManager | null;
}

const initialState: IHomePageManagerState = {
  homepage: null,
};

const homepageReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_HOME_PAGE_MANAGER_SUCCESS:
        draft.homepage = action.payload;
        break;
      default:
        break;
    }
  });

export default homepageReducer;
