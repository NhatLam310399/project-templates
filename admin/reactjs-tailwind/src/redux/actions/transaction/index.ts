import * as types from "redux/types/transaction";
import { IById, IGetAllTransaction } from "common/typings";

export const getAllTransaction = (payload: IGetAllTransaction) => ({
  type: types.GET_ALL_TRANSACTION,
  payload,
});

export const getAllTransactionSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_TRANSACTION_SUCCESS,
  payload,
});

export const deleteTransaction = (payload: IById) => ({
  type: types.DELETE_TRANSACTION,
  payload,
});
