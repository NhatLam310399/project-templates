import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/request";
import { IPlace } from "common/typings";

interface IRequestState {
  requests: {
    loading: boolean;
    results: IPlace[];
    totalCount: number;
  };
  requestById: IPlace;
}

const initialState: IRequestState = {
  requests: {
    loading: true,
    results: [],
    totalCount: 0,
  },
  requestById: {
    name: "",
  },
};

const request = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_REQUEST_SUCCESS:
        draft.requests = action.payload;
        draft.requests.loading = false;
        break;
      case types.GET_REQUEST_BY_ID_SUCCESS:
        draft.requestById = action.payload;
        break;
      default:
        break;
    }
  });

export default request;
