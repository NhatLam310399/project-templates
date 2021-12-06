import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const Recruitment = lazy(() => import("pages/dashboard/job/Recruitment"));
const AppliedUsers = lazy(() => import("pages/dashboard/job/AppliedUsers"));
const ViewedUsers = lazy(() => import("pages/dashboard/job/ViewedUsers"));

export const jobRoutes: IRoutes = {
    name: t("drawer.job-management"),
    path: PATH.JOB.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.Job,
    permission: "MANAGER",
    children: [
        {
            name: t("drawer.recruitment-list"),
            path: PATH.JOB.RECRUITMENT_LIST,
            exact: true,
            Component: Recruitment,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.applied-list"),
            path: PATH.JOB.APPLIED_LIST,
            exact: true,
            Component: AppliedUsers,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.viewed-list"),
            path: PATH.JOB.VIEWED,
            exact: true,
            Component: ViewedUsers,
            isPrivate: true,
            permission: "MANAGER",
        },
    ],
};
