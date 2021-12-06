import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { HomeIcon } from "designs/icons/Drawer";

const Overview = lazy(() => import("pages/dashboard/Overview"));

export const overviewRoute: IRoutes = {
  name: "Tổng quan",
  path: PATH.OVERVIEW,
  exact: true,
  Component: Overview,
  isPrivate: true,
  Icon: HomeIcon,
};
