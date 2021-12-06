import * as types from "redux/types/overview";

export const getOverview = () => ({
    type: types.GET_OVERVIEW,
});

export const getOverviewSuccess = <T>(payload: T) => ({
    type: types.GET_OVERVIEW_SUCCESS,
    payload,
});
