import { ITextStyleConfig } from "common/constants/editor";
import * as types from "redux/types/editorController";
import { IControllerTabType } from "typings";

export const changeControllerTab = (tabType: IControllerTabType) => ({
  type: types.CHANGE_CONTROLLER_TAB,
  payload: tabType,
});

export const setTextStyleConfig = (config: Partial<ITextStyleConfig>) => ({
  type: types.SET_TEXT_CONFIG,
  payload: config,
});

export const setActiveSideIndex = (config: number) => ({
  type: types.SET_ACTIVE_SIDE_INDEX,
  payload: config,
});
