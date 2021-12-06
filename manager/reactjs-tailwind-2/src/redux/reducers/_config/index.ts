import producer from "immer";
import * as types from "redux/types/_config";
import { IBreadCrumb } from "common/typings";

export interface IConfig {
  isExtendDrawer: boolean;
  isExtendDrawerDropdown: boolean;
  breadcrumb: IBreadCrumb[];
}

const initialState: IConfig = {
  isExtendDrawer: false,
  isExtendDrawerDropdown: false,
  breadcrumb: [],
};

export default (state = initialState, actions: any) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.SET_EXTEND_DRAWER:
        draft.isExtendDrawer = actions.payload;
        break;
      case types.SET_EXTEND_DRAWER_DROPDOWN:
        draft.isExtendDrawerDropdown = actions.payload;
        break;
      case types.SET_BREADCRUMB:
        draft.breadcrumb = actions.payload;
        break;
      default:
        break;
    }
  });
