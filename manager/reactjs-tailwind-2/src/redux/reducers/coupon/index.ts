import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/coupon";
import { ICoupon } from "common/typings";

interface couponState {
  allCoupon: ICoupon[];
  couponTotalCount: number;
}

const initialState: couponState = {
  allCoupon: [],
  couponTotalCount: 0,
};

const couponReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_COUPON_SUCCESS:
        draft.allCoupon = action.payload.results;
        draft.couponTotalCount = action.payload.totalCount;
        break;
      default:
        break;
    }
  });

export default couponReducer;
