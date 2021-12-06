import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/overview";
import { IOverview } from "common/formatTypes";

interface IOverViewState {
    overviews: IOverview | null;
}

const initialState: IOverViewState = {
    overviews: null,
};

const overviewReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_OVERVIEW_SUCCESS:
                draft.overviews = actions.payload;
                break;
        }
    });

export default overviewReducer;
