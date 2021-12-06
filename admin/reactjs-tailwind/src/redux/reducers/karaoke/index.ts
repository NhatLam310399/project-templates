import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/karaoke";
import { IPlace } from "common/typings";

interface IKaraokeState {
  allKaraoke: {
    loading: boolean;
    results: IPlace[];
    totalCount: number;
  };
  allKaraokeHighlight: {
    results: IPlace[];
    totalCount: number;
  };
  karaoke: IPlace | null;
}

const initialState: IKaraokeState = {
  allKaraoke: {
    loading: true,
    results: [],
    totalCount: 0,
  },
  allKaraokeHighlight: {
    results: [],
    totalCount: 0,
  },
  karaoke: null,
};

const karaokeReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_KARAOKE_SUCCESS:
        draft.allKaraoke = action.payload;
        draft.allKaraoke.loading = false;
        break;
      case types.GET_ALL_KARAOKE_HIGHLIGHT_SUCCESS:
        draft.allKaraokeHighlight = action.payload;
        break;
      case types.GET_KARAOKE_SUCCESS:
        draft.karaoke = action.payload;
        break;
      default:
        break;
    }
  });

export default karaokeReducer;
