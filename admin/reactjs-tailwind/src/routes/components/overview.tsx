import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { OverviewIcon } from "designs/icons/Drawer";

const Overview = lazy(() => import("pages/dashboard/Overview"));

export const overviewRoutes: IRoutes = {
  name: "Tổng quan",
  path: PATH.OVERVIEW,
  exact: true,
  Component: Overview,
  isPrivate: true,
  Icon: OverviewIcon,
};
