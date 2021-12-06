import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import * as icons from "designs/Icons/Drawer";
import { t } from "language";

const Contact = lazy(() => import("pages/dashboard/Contact"));

export const contactRoutes: IRoutes = {
    name: t("drawer.contact"),
    path: PATH.CONTACT,
    exact: true,
    Component: Contact,
    isPrivate: true,
    Icon: icons.Contact,
    permission: "MANAGER",
};
