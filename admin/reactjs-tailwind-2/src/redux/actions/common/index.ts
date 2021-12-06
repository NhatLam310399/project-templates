import * as types from "redux/types/common";

export const submitted = () => ({
    type: types.SUBMITTED,
});

export const resetSubmitted = () => ({
    type: types.RESET_SUBMITTED,
});

export const actionSuccess = () => ({
    type: types.ACTION_SUCCESS,
});

export const resetAction = () => ({
    type: types.RESET_ACTION,
});

export const setLoading = (payload: boolean) => ({
    type: types.SET_LOADING,
    payload,
});
