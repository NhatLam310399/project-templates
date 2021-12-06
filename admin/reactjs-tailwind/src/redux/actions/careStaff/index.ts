import * as types from "redux/types/careStaff";
import { IById, IGetAllCareStaff } from "common/typings";

export const getAllCareStaff = (payload: IGetAllCareStaff) => ({
  type: types.GET_ALL_CARE_STAFF,
  payload,
});

export const getAllCareStaffSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CARE_STAFF_SUCCESS,
  payload,
});

export const getCareStaffById = (payload: IById) => ({
  type: types.GET_ALL_CARE_STAFF,
  payload,
});

export const getCareStaffSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CARE_STAFF_SUCCESS,
  payload,
});

export const deleteCareStaffById = (payload: IById) => ({
  type: types.DELETE_CARE_STAFF_BY_ID,
  payload,
});
