import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { SettingIcon } from "designs/icons/Drawer";

const Setting = lazy(() => import("pages/dashboard/Setting"));
export const settingRoute: IRoutes = {
  name: "Cài đặt",
  path: PATH.SETTING,
  exact: true,
  Component: Setting,
  isPrivate: true,
  Icon: SettingIcon,
};
