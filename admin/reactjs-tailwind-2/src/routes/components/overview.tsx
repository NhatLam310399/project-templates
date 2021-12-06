import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const Overview = lazy(() => import("pages/dashboard/Overview"));

export const overviewRoutes: IRoutes = {
    name: t("drawer.overview"),
    path: PATH.OVERVIEW,
    exact: true,
    Component: Overview,
    isPrivate: true,
    Icon: icons.Overview,
    permission: "MANAGER",
};
