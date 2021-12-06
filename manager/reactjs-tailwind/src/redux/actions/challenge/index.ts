import { IGetAllChallengeType } from "typings"
import * as types from "redux/types/challenge"

export const getAllChallengeType = (payload: IGetAllChallengeType) => ({
  type: types.GET_ALL_CHALLENGE_TYPE,
  payload,
})

export const getAllChallengeTypeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_CHALLENGE_TYPE_SUCCESS,
  payload,
})