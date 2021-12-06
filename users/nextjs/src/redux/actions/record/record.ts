import * as types from "@redux/types/record";
import {
  IGetAllRecord,
  IGetRecordById,
  IGetRecordByUserId,
  IRecordUpdateInput,
  IRecordCreateInput,
} from "@common/typings";

export const getAllRecordByUser = (payload: IGetAllRecord) => ({
  type: types.GET_ALL_RECORD_BY_USER,
  payload,
});

export const getAllRecordByUserSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_RECORD_BY_USER_SUCCESS,
  payload,
});

export const getRecordById = (payload: IGetRecordById) => ({
  type: types.GET_RECORD_BY_ID,
  payload,
});

export const getRecordByIdSuccess = <T>(payload: T) => ({
  type: types.GET_RECORD_BY_ID_SUCCESS,
  payload,
});

export const getRecordByUserId = (payload: IGetRecordByUserId) => ({
  type: types.GET_RECORD_BY_USER_ID,
  payload,
});

export const getRecordByUserIdSuccess = <T>(payload: T) => ({
  type: types.GET_RECORD_BY_USER_ID_SUCCESS,
  payload,
});

export const updateRecord = (payload: IRecordUpdateInput) => ({
  type: types.UPDATE_RECORD,
  payload,
});

export const createRecord = (payload: IRecordCreateInput) => ({
  type: types.CREATE_RECORD,
  payload,
});
