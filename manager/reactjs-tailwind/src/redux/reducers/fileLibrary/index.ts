import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/fileLibrary";

export interface IFileLibraryState {
  step: number;
}

const initialState: IFileLibraryState = {
  step: 1,
};

const fileLibrary = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.STEP_FILE:
        draft.step = action.payload;
        break;
    }
  });

export default fileLibrary;
