import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const GeneralSetting = lazy(() => import("pages/dashboard/Setting/General"));
const SeoSetting = lazy(() => import("pages/dashboard/Setting/SEO"));
const AdsByCode = lazy(() => import("pages/dashboard/Setting/AdsByCode"));
const AdsByImage = lazy(() => import("pages/dashboard/Setting/AdsByImage"));
const StaticPage = lazy(() => import("pages/dashboard/Setting/StaticPage"));

export const generalSettingRoutes: IRoutes = {
    name: t("drawer.setting"),
    path: PATH.SETTING.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.SystemSetting,
    permission: "MANAGER",
    children: [
        {
            name: t("drawer.general-setting"),
            path: PATH.SETTING.GENERAL,
            exact: true,
            Component: GeneralSetting,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.seo-setting"),
            path: PATH.SETTING.SEO,
            exact: true,
            Component: SeoSetting,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.code-ads"),
            path: PATH.SETTING.ADS_BY_CODE,
            exact: true,
            Component: AdsByCode,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.image-ads"),
            path: PATH.SETTING.ADS_BY_IMG,
            exact: true,
            Component: AdsByImage,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.static-page"),
            path: PATH.SETTING.STATIC_PAGE,
            exact: true,
            Component: StaticPage,
            isPrivate: true,
            permission: "MANAGER",
        },
    ],
};
