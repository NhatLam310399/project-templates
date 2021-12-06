import producer from "immer";
import * as types from "redux/types/_config";
import { IBreadcrumb } from "common/typings";

export interface IConfig {
  isExtendDrawer: boolean;
  breadcrumb: IBreadcrumb;
}

const initialState: IConfig = {
  isExtendDrawer: true,
  breadcrumb: [],
};

export default (state = initialState, actions: any) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.SET_EXTEND_DRAWER:
        draft.isExtendDrawer = actions.payload;
        break;
      case types.SET_BREADCRUMB:
        draft.breadcrumb = actions.payload;
        break;
      default:
        break;
    }
  });
