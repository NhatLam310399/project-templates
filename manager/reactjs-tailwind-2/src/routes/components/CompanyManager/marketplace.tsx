import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { MarketplaceIcon } from "designs/icons/Drawer";

const Marketplace = lazy(() => import("pages/dashboard/Marketplace"));
export const marketplaceRoute: IRoutes = {
  name: "Quản lý chợ",
  path: PATH.MARKETPLACE,
  exact: true,
  Component: Marketplace,
  isPrivate: true,
  Icon: MarketplaceIcon,
};
