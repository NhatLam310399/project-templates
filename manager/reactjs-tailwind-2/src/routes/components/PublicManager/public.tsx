import { lazy } from "react";
import { Redirect } from "react-router";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import NotFound from "pages/NotFound";

const HomePage = lazy(() => import("pages/HomePage"));
const ShareLink = lazy(() => import("pages/PageLink"));

export const rootRoute: IRoutes = {
  name: "Root",
  path: "/",
  exact: true,
  Component: () => <Redirect to="/dashboard/overview" />,
  isPrivate: true,
};

export const homeRoutes: IRoutes = {
  name: "home",
  path: PATH.HOME,
  exact: true,
  Component: HomePage,
  isPrivate: false,
};

export const notFoundRoutes: IRoutes = {
  name: "NotFound",
  path: PATH.NOT_FOUND,
  exact: false,
  Component: NotFound,
  isPrivate: false,
};

export const shareLinkRouter: IRoutes = {
  name: "ShareLink",
  path: PATH.LINK_SHARE,
  exact: false,
  isShare: true,
  Component: ShareLink,
  isPrivate: false,
};
