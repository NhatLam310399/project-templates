import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { StatisticIcon } from "designs/icons/Drawer";

const Statistic = lazy(() => import("pages/dashboard/Statistics"));

export const statisticRoute: IRoutes = {
  name: "Thống kê thu nhập",
  path: PATH.STATISTIC,
  exact: true,
  Component: Statistic,
  isPrivate: true,
  Icon: StatisticIcon,
};
