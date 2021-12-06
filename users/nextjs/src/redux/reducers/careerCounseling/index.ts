import produce from "immer";
import * as types from "@redux/types/careerCounseling";
import { AnyAction } from "redux";
import { ICarrerCounseling } from "@common/typings";

interface CareerCounselingState {
  listCarrerCounseling: {
    results: ICarrerCounseling[];
    totalCount: number;
  };
}

const initialState: CareerCounselingState = {
  listCarrerCounseling: {
    results: [],
    totalCount: 0,
  },
};

const careercounseling = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_CARRER_COUSELING_SUCCESS:
        draft.listCarrerCounseling = action.payload;
        break;
    }
  });

export default careercounseling;
