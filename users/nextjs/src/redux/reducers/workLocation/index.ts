import produce from "immer";
import * as types from "@redux/types/workLocation";
import { AnyAction } from "redux";
import { IWorkLocation } from "@common/typings";

interface WorkLocationStateType {
  allWorkLocation: {
    results: IWorkLocation[];
    totalCount: number;
  };
  workLocation: {
    results: IWorkLocation[];
    totalCount: number;
  };
}

const initialState: WorkLocationStateType = {
  allWorkLocation: {
    results: [],
    totalCount: 0,
  },
  workLocation: {
    results: [],
    totalCount: 0,
  },
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_WORK_LOCATION_SUCCESS:
        draft.allWorkLocation = action.payload;
        break;
    }
    switch (action.type) {
      case types.GET_WORK_LOCATION_BY_COMPANY_SUCCESS:
        draft.workLocation = action.payload;
        break;
    }
  });

export default reducer;
