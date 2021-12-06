import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const Province = lazy(() => import("pages/dashboard/location/Province"));
const District = lazy(() => import("pages/dashboard/location/District"));
const Ward = lazy(() => import("pages/dashboard/location/Ward"));

export const locationRoutes: IRoutes = {
    name: t("drawer.location"),
    path: PATH.LOCATION.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.Location,
    children: [
        {
            name: t("drawer.location-province"),
            path: PATH.LOCATION.PROVINCE,
            exact: true,
            Component: Province,
            isPrivate: true,
        },
        {
            name: t("drawer.location-district"),
            path: PATH.LOCATION.DISTRICT,
            exact: true,
            Component: District,
            isPrivate: true,
        },
        {
            name: t("drawer.location-ward"),
            path: PATH.LOCATION.WARD,
            exact: true,
            Component: Ward,
            isPrivate: true,
        },
    ],
};
