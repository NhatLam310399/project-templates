import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/project";
import { IProjectType } from "common/typings";

interface IProjectState {
  allProject: {
    results: IProjectType[];
    totalCount: number;
  };
}

const initialState: IProjectState = {
  allProject: {
    results: [],
    totalCount: 0,
  },
};

const projectReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_PROJECT_SUCCESS:
        draft.allProject = action.payload;
        break;

      default:
        break;
    }
  });

export default projectReducer;
