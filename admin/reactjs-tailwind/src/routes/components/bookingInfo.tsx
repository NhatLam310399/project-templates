import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { BookingInfoIcon } from "designs/icons/Drawer";

const CouponCode = lazy(() => import("pages/dashboard/booking/CouponCode"));
const CouponNews = lazy(() => import("pages/dashboard/booking/CouponNews"));
const Transaction = lazy(() => import("pages/dashboard/booking/Transaction"));
const Room = lazy(() => import("pages/dashboard/booking/Room"));

export const bookingInfoRoutes: IRoutes = {
  name: "Thông tin booking",
  path: PATH.BOOKING_INFO.SELF,
  exact: true,
  isPrivate: true,
  Icon: BookingInfoIcon,
  children: [
    {
      name: "Mã Khuyến mãi",
      path: PATH.BOOKING_INFO.COUPON_CODE,
      exact: true,
      Component: CouponCode,
      isPrivate: true,
    },
    {
      name: "Tin khuyến mãi",
      path: PATH.BOOKING_INFO.COUPON_NEWS,
      exact: true,
      Component: CouponNews,
      isPrivate: true,
    },
    {
      name: "Thống kê phòng",
      path: PATH.BOOKING_INFO.ROOM,
      exact: true,
      Component: Room,
      isPrivate: true,
    },
    {
      name: "Thống kê giao dịch",
      path: PATH.BOOKING_INFO.TRANSACTION,
      exact: true,
      Component: Transaction,
      isPrivate: true,
    },
  ],
};
