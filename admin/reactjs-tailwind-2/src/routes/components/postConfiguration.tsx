import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const Overview = lazy(() => import("pages/dashboard/Overview"));
const CategoryLevel1 = lazy(
    () => import("pages/dashboard/PostConfiguraiton/CategoryLevel1"),
);
const CategoryLevel2 = lazy(
    () => import("pages/dashboard/PostConfiguraiton/CategoryLevel2"),
);
const CareerLevel = lazy(
    () => import("pages/dashboard/PostConfiguraiton/CareerLevel"),
);
const JobType = lazy(() => import("pages/dashboard/PostConfiguraiton/JobType"));
const Benefit = lazy(() => import("pages/dashboard/PostConfiguraiton/Benefit"));
const Keyword = lazy(() => import("pages/dashboard/PostConfiguraiton/Keyword"));

export const postConfiguration: IRoutes = {
    name: t("drawer.post-configuration.self"),
    path: PATH.POST_MANAGEMENT.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.NewsConfig,
    permission: "MANAGER",
    children: [
        {
            name: t("drawer.post-configuration.job-category-lv1"),
            path: PATH.POST_MANAGEMENT.FIRST_LEVEL,
            exact: true,
            Component: CategoryLevel1,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.post-configuration.job-category-lv2"),
            path: PATH.POST_MANAGEMENT.SECOND_LEVEL,
            exact: true,
            Component: CategoryLevel2,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.post-configuration.job-career"),
            path: PATH.POST_MANAGEMENT.JOB_LEVELS,
            exact: true,
            Component: CareerLevel,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.post-configuration.job-type"),
            path: PATH.POST_MANAGEMENT.JOB_TYPES,
            exact: true,
            isPrivate: true,
            Component: JobType,
            permission: "MANAGER",
        },
        {
            name: t("drawer.post-configuration.welfare"),
            path: PATH.POST_MANAGEMENT.WELFARE,
            exact: true,
            isPrivate: true,
            Component: Benefit,
            permission: "MANAGER",
        },
        {
            name: t("drawer.post-configuration.job-tags"),
            path: PATH.POST_MANAGEMENT.LANGUAGE,
            exact: true,
            isPrivate: true,
            Component: Keyword,
            permission: "MANAGER",
        },
    ],
};
