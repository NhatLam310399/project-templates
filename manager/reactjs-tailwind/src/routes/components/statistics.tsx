import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import StatisticIcon from "icons/Dashboard/Statistic";

const Statistics = lazy(() => import("../../pages/dashboard/Statistics"));
export const statisticsRoute: IRoutes = {
  name: "Statistics",
  path: PATH.STATISTIC,
  exact: true,
  Component: Statistics,
  isPrivate: true,
  Icon: <StatisticIcon />,
};
