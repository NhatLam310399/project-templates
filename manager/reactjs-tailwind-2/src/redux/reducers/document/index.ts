import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/document";
import { IBasicDocumentType, IDocumentType } from "common/typings";

interface IDocumentState {
  allBasicDocument: {
    results: IBasicDocumentType[];
    totalCount: number;
  };
  allDocument: {
    results: IDocumentType[];
    totalCount: number;
  };
}

const initialState: IDocumentState = {
  allBasicDocument: {
    results: [],
    totalCount: 0,
  },
  allDocument: {
    results: [],
    totalCount: 0,
  },
};

const documentReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_BASIC_DOCUMENT_SUCCESS:
        draft.allBasicDocument = action.payload;
        break;
      case types.GET_ALL_DOCUMENT_SUCCESS:
        draft.allDocument = action.payload;
        break;

      default:
        break;
    }
  });

export default documentReducer;
