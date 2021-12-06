import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/rating";
import { IRating } from "common/formatTypes";

interface IRatingReducer {
    allRating: {
        results: IRating[];
        totalCount: number;
        loading: boolean;
    };
}

const initialState: IRatingReducer = {
    allRating: {
        results: [],
        totalCount: 0,
        loading: true,
    },
};

const ratingReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_ALL_RATING_SUCCESS:
                draft.allRating = { ...actions.payload, loading: false };
                break;
        }
    });

export default ratingReducer;
