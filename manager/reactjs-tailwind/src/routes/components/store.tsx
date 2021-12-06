import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import StoreIcon from "icons/Dashboard/Store";

const Store = lazy(() => import("pages/dashboard/Store"));

export const storeRoute: IRoutes = {
  name: "Store",
  path: PATH.STORE,
  exact: true,
  Component: Store,
  isPrivate: true,
  Icon: <StoreIcon />,
};
