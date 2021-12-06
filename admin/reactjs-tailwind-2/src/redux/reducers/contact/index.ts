import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/contact";
import { IContact } from "common/formatTypes";

interface IContactReducer {
    allContact: {
        results: IContact[];
        totalCount: number;
        loading: boolean;
    };
}

const initialState: IContactReducer = {
    allContact: {
        results: [],
        totalCount: 0,
        loading: true,
    },
};

const contactReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_ALL_CONTACT_SUCCESS:
                draft.allContact = { ...actions.payload, loading: false };
                break;
            default:
                break;
        }
    });
export default contactReducer;
