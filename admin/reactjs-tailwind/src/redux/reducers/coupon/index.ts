import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/coupon";
import { ICoupon, ICouponNews } from "common/typings";

interface couponState {
  allCoupon: ICoupon[];
  couponTotalCount: number;
  allCouponNews: ICouponNews[];
  couponNewsTotalCount: number;
  allCouponLoading: boolean;
  allCouponNewLoading: boolean;
}

const initialState: couponState = {
  allCoupon: [],
  couponTotalCount: 0,
  allCouponLoading: true,
  allCouponNews: [],
  couponNewsTotalCount: 0,
  allCouponNewLoading: true,
};

const couponReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_PUBLIC_COUPONS_SUCCESS:
        draft.allCoupon = action.payload.results;
        draft.couponTotalCount = action.payload.totalCount;
        draft.allCouponLoading = false;
        break;
      case types.GET_ALL_COUPON_NEWS_SUCCESS:
        draft.allCouponNews = action.payload.results;
        draft.couponNewsTotalCount = action.payload.totalCount;
        draft.allCouponNewLoading = false;
        break;
      default:
        break;
    }
  });

export default couponReducer;
