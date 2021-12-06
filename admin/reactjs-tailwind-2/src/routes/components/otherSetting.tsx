import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const PointSetting = lazy(() => import("pages/dashboard/OtherSetting/Point"));
const NotifySetting = lazy(() => import("pages/dashboard/OtherSetting/Notify"));

export const otherSettingRoutes: IRoutes = {
    name: t("drawer.other-setting"),
    path: PATH.OTHER_SETTING.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.OtherSetting,
    permission: "MANAGER",
    children: [
        {
            name: t("drawer.point-setting"),
            path: PATH.OTHER_SETTING.POINT,
            exact: true,
            Component: PointSetting,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.notification-setting"),
            path: PATH.OTHER_SETTING.NOTIFICATION,
            exact: true,
            Component: NotifySetting,
            isPrivate: true,
            permission: "MANAGER",
        },
    ],
};
