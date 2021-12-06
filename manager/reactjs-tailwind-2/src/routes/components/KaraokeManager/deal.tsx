import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { DealIcon } from "designs/icons/Drawer";
const Deal = lazy(() => import("pages/dashboard/Deal"));
export const dealRoute: IRoutes = {
  name: "Khuyến mãi",
  path: PATH.DEAL,
  exact: true,
  Component: Deal,
  isPrivate: true,
  Icon: DealIcon,
};
