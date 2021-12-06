import produce from "immer"
import * as types from "redux/types/challenge"
import { AnyAction } from "redux";
import { IChallengeType } from "typings"

interface IChallengeProps {
  allChallengeType: {
    results: IChallengeType[];
  }
}

const initialState: IChallengeProps = {
  allChallengeType: {
    results: []
  }
}

const challengeReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_CHALLENGE_TYPE_SUCCESS:
        draft.allChallengeType = action.payload
        break;
    }
  });

export default challengeReducer;