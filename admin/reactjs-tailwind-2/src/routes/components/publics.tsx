import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { Redirect } from "react-router";
import { PATH } from "constants/routes";
import NotFound from "pages/NotFound";

// Import Route Components
const Login = lazy(() => import("pages/Login"));

const Overview = lazy(() => import("pages/dashboard/Overview"));

export const rootRoute: IRoutes = {
    name: "Root",
    exact: true,
    path: "/",
    Component: () => <Redirect to="/dashboard/overview" />,
    isPrivate: true,
    permission: "MANAGER",
};

export const authRoutes: IRoutes = {
    name: "auth",
    path: PATH.ACCOUNT.SELF,
    isPrivate: false,
    children: [
        {
            name: "login",
            path: PATH.ACCOUNT.LOGIN,
            Component: Login,
            isPrivate: false,
        },
        {
            name: "overview",
            path: "account/overview",
            Component: Overview,
            isPrivate: false,
        },
    ],
};

// Not Found page
export const notFoundRoutes: IRoutes = {
    name: "NotFound",
    path: PATH.NOT_FOUND,
    exact: false,
    Component: NotFound,
    isPrivate: false,
};
