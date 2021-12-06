import { IBreadcrumb } from "typings";
import * as types from "redux/types/_config";

export const setExtendDrawer = (payload: boolean) => ({
  type: types.SET_EXTEND_DRAWER,
  payload,
});

export const toggleExtendDrawer = () => ({
  type: types.TOGGLE_EXTEND_DRAWER,
});

export const setBreadcrumb = (payload: IBreadcrumb) => ({
  type: types.SET_BREADCRUMB,
  payload,
});

export const startLoading = (task: string) => ({
  type: types.START_LOADING,
  payload: task,
});

export const stopLoading = (task: string) => ({
  type: types.STOP_LOADING,
  payload: task,
});

export const clearLoadingTasks = () => ({
  type: types.CLEAR_LOADING_TASKS,
});
