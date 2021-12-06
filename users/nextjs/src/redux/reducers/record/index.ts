import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/record";
import { IRecord } from "@common/typings";

interface RecordReducer {
  record: IRecord;
}

const initialState: RecordReducer = {
  record: null,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_RECORD_BY_USER_SUCCESS:
        draft.record = action.payload;
        break;
      case types.GET_RECORD_BY_USER_ID_SUCCESS:
        draft.record = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
