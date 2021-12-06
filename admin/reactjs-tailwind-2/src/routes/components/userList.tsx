import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const Admin = lazy(() => import("pages/dashboard/UserList/Admin"));
const JobSeeker = lazy(() => import("pages/dashboard/UserList/JobSeeker"));
const Manager = lazy(() => import("pages/dashboard/UserList/Manager"));
export const userListRoutes: IRoutes = {
    name: t("drawer.user-manager"),
    path: PATH.USER_LIST.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.ManageUser,
    children: [
        {
            name: t("drawer.user-candidate"),
            path: PATH.USER_LIST.USER,
            exact: true,
            Component: JobSeeker,
            isPrivate: true,
        },
        {
            name: t("drawer.user-system"),
            path: PATH.USER_LIST.MANAGER,
            exact: true,
            Component: Manager,
            isPrivate: true,
        },
        {
            name: t("drawer.user-admin"),
            path: PATH.USER_LIST.ADMIN,
            exact: true,
            Component: Admin,
            isPrivate: true,
        },
    ],
};
