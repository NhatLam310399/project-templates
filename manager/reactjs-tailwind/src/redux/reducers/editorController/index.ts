import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/editorController";
import { IControllerTabType } from "typings";
import {
  fontFamilies,
  ITextStyleConfig,
  listDetailColors,
} from "common/constants/editor";

interface IEditorControllerState {
  currentTab: IControllerTabType;
  textStyleConfig: ITextStyleConfig;
  activeSideIndex: number;
}

const initialState: IEditorControllerState = {
  currentTab: "MENU",
  activeSideIndex: 0,
  textStyleConfig: {
    fontFamily: fontFamilies[0],
    fill: listDetailColors[1],
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
    fontStyle: "normal",
    rotate: 0,
    arc: 0,
  },
};

const editorController = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_CONTROLLER_TAB:
        draft.currentTab = action.payload;
        break;
      case types.SET_TEXT_CONFIG:
        draft.textStyleConfig = {
          ...draft.textStyleConfig,
          ...action.payload,
        };
        break;
      case types.SET_ACTIVE_SIDE_INDEX:
        draft.activeSideIndex = action.payload;
        break;
    }
  });

export default editorController;
