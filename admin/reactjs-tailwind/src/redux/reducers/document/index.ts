import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/document";
import { IBasicDocumentType } from "common/typings";

interface IBasicDocumentState {
  allBasicDocument: {
    results: IBasicDocumentType[];
    totalCount: number;
  };
}

const initialState: IBasicDocumentState = {
  allBasicDocument: {
    results: [],
    totalCount: 0,
  },
};

const basicDocumentReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_BASIC_DOCUMENT_SUCCESS:
        draft.allBasicDocument = action.payload;
        break;

      default:
        break;
    }
  });

export default basicDocumentReducer;
