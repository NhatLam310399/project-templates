import produce from "immer"
import * as types from "redux/types/premiumImage"
import { AnyAction } from "redux";
import { IPremiumImage } from "typings"

interface IPremiumImageState {
  premiumImage: {
    results: IPremiumImage[];
    totalCount: number
  }
}

const initialState: IPremiumImageState = {
  premiumImage: {
    results: [],
    totalCount: 0
  }
}

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_PREMIUM_IMAGE_SUCCESS:
        draft.premiumImage = action.payload;
        break;
    }
  });

export default reducer;