import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/types";
import { ITypes } from "common/formatTypes";

interface ITypesReducer {
    listTypes: ITypes[];
}

const initialState: ITypesReducer = {
    listTypes: [],
};

const typesReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_TYPES_BY_CODE_SUCCESS:
                draft.listTypes = actions.payload;
                break;
            default:
                break;
        }
    });

export default typesReducer;
