import { lazy } from "react";
import { IRoutes } from "common/typings";
import { Redirect } from "react-router";
import { PATH } from "constants/routes";
import NotFound from "pages/NotFound";

// Import Route Components
const Login = lazy(() => import("pages/Login"));

export const rootRoute: IRoutes = {
  name: "Root",
  exact: true,
  path: "/",
  Component: () => <Redirect to="/dashboard/overview" />,
  isPrivate: true,
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
