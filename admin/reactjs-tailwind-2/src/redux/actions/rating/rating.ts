import * as types from "redux/types/rating";
import {
    IRatingCreateInput,
    IGetAllRating,
    IRatingUpdateInput,
    IRatingDelete,
} from "common/formatTypes";

export const getAllRating = (payload: IGetAllRating) => ({
    type: types.GET_ALL_RATING,
    payload,
});

export const getAllRatingSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_RATING_SUCCESS,
    payload,
});

export const createRating = (payload: IRatingCreateInput) => ({
    type: types.CREATE_RATING,
    payload,
});

export const ratingUpdate = (payload: IRatingUpdateInput) => ({
    type: types.UPDATE_RATING,
    payload,
});

export const deleteRating = (payload: IRatingDelete) => ({
    type: types.DELETE_RATING,
    payload,
});
