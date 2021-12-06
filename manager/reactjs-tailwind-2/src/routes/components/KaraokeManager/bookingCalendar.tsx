import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { BookingIcon } from "designs/icons/Drawer";
const Booking = lazy(() => import("pages/dashboard/BookingCalendar"));

export const bookingRoute: IRoutes = {
  name: "Lịch đặt phòng",
  path: PATH.BOOKING,
  exact: true,
  Component: Booking,
  isPrivate: true,
  Icon: BookingIcon,
};
