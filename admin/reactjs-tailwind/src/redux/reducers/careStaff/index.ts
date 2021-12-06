import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/careStaff";
import { ICareStaff } from "common/typings";

interface ICareStaffState {
  allCareStaff: {
    results: ICareStaff[];
    totalCount: number;
  };
  careStaff: ICareStaff | null;
}

const initialState: ICareStaffState = {
  allCareStaff: {
    results: [],
    totalCount: 0,
  },
  careStaff: null,
};

const careStaffReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_CARE_STAFF_SUCCESS:
        draft.allCareStaff = action.payload;
        break;
      case types.GET_CARE_STAFF_SUCCESS:
        draft.careStaff = action.payload;
        break;
      default:
        break;
    }
  });

export default careStaffReducer;
