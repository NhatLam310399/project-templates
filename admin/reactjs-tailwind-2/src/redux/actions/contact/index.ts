import { IDeleteContact } from "common/formatTypes";
import * as types from "redux/types/contact";

export const getAllContact = () => ({
    type: types.GET_ALL_CONTACT,
});
export const getAllContactSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_CONTACT_SUCCESS,
    payload,
});
export const deleteContact = (payload: IDeleteContact) => ({
    type: types.DELETE_CONTACT,
    payload,
});
