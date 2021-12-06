import { IGetRevenueKaraoke } from "common/typings";
import * as types from "redux/types/revenueKaraoke";

export const getRevenueKaraoke = (payload: IGetRevenueKaraoke) => ({
  type: types.GET_REVENUE_KARAOKE,
  payload,
});

export const getRevenueKaraokeSuccess = <T>(payload: T) => ({
  type: types.GET_REVENUE_KARAOKE_SUCCESS,
  payload,
});
