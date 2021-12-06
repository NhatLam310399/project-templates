import producer from "immer";
import * as types from "redux/types/_config";
import { IBreadcrumb } from "typings";

export interface IConfig {
  isExtendDrawer: boolean;
  breadcrumb: IBreadcrumb;
  loadingTasks: string[];
}

const initialState: IConfig = {
  isExtendDrawer: true,
  breadcrumb: [],
  loadingTasks: [],
};

export default (state = initialState, actions: any) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.SET_EXTEND_DRAWER:
        draft.isExtendDrawer = actions.payload;
        break;
      case types.TOGGLE_EXTEND_DRAWER:
        draft.isExtendDrawer = !draft.isExtendDrawer;
        break;
      case types.SET_BREADCRUMB:
        draft.breadcrumb = actions.payload;
        break;

      case types.START_LOADING:
        draft.loadingTasks.push(actions.payload);
        break;
      case types.STOP_LOADING:
        draft.loadingTasks =
          draft.loadingTasks.filter(item => item !== actions.payload) || [];
        break;
      case types.CLEAR_LOADING_TASKS:
        draft.loadingTasks = [];
        break;

      default:
        break;
    }
  });
