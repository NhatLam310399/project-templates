import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const ListEmployer = lazy(
    () => import("pages/dashboard/employerManagement/List"),
);
const ActionAccountPage = lazy(
    () => import("pages/dashboard/employerManagement/Account"),
);
const ActionCompanyPage = lazy(
    () => import("pages/dashboard/employerManagement/Company"),
);

export const manageEmployerRoutes: IRoutes = {
    name: t("drawer.manage-employer.self"),
    path: PATH.MANAGE_EMPLOYER.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.Company,
    Component: ListEmployer,
    permission: "MANAGER",
};

export const addEmployerRoutes: IRoutes = {
    name: t("drawer.manage-employer.add"),
    path: PATH.MANAGE_EMPLOYER.ADD.ACCOUNT,
    exact: true,
    isPrivate: true,
    Component: ActionAccountPage,
    permission: "MANAGER",
};

export const addCompanyRoutes: IRoutes = {
    name: t("drawer.manage-employer.add"),
    path: PATH.MANAGE_EMPLOYER.ADD.COMPANY,
    exact: true,
    isPrivate: true,
    Component: ActionCompanyPage,
    permission: "MANAGER",
};
