import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/listUsers";
import { IUser } from "common/formatTypes";

interface IListUserReducer {
    users: {
        results: IUser[];
        totalCount: number;
        loading: boolean;
    };
    usersByRecruitment: {
        results: {
            user: IUser[];
            status: string[];
        }
        totalCount: number;
        loading: boolean;
    };

    employerCreated: IUser | null;
}

const initialState: IListUserReducer = {
    users: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    usersByRecruitment: {
        results: {
            user: [],
            status: [],
        },
        totalCount: 0,
        loading: true,
    },
    employerCreated: null,
};

const listUsers = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_ALL_USER_HAS_PERMISSIONS_SUCCESS:
                draft.users = { ...actions.payload, loading: false };
                break;
            case types.GET_USER_BY_RECRUITMENT_SUCCESS:
                draft.usersByRecruitment = { ...actions.payload, loading: false };
                break;
            case types.GET_USER_JUST_CREATE:
                draft.employerCreated = actions.payload;
                break;
        }
    });

export default listUsers;
