import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import HelpIcon from "icons/Dashboard/Help";

const Help = lazy(() => import("pages/dashboard/Help"));
const HelpCenter = lazy(() => import("pages/dashboard/Help/HelpCenter"));
const HelpCenterDetail = lazy(
  () => import("pages/dashboard/Help/HelpCenterDetail"),
);
const HelpCenterArtical = lazy(
  () => import("pages/dashboard/Help/ArticalDetail"),
);
const Section = lazy(() => import("pages/dashboard/Help/Section"));

export const helpRoute: IRoutes = {
  name: "Help",
  path: PATH.HELP,
  exact: true,
  Component: () => <Help />,
  isPrivate: true,
  Icon: <HelpIcon />,
};

export const helpCenterRoute: IRoutes = {
  name: "Help Center",
  path: PATH.HELP_CENTER,
  exact: true,
  isPrivate: true,
  helpCenterRoute: true,
  hiddenRoute: true,
  Component: () => <HelpCenter />,
};

export const helpCenterDetail: IRoutes = {
  name: "Help Center Detail ",
  path: PATH.HELP_CENTER_DETAIL,
  exact: true,
  isPrivate: true,
  helpCenterRoute: true,
  hiddenRoute: true,
  Component: () => <HelpCenterDetail />,
};

export const helpCenterArtical: IRoutes = {
  name: "Help Center Artical ",
  path: PATH.HELP_CENTER_ARTICAL,
  exact: true,
  isPrivate: true,
  helpCenterRoute: true,
  hiddenRoute: true,
  Component: () => <HelpCenterArtical />,
};

export const helpCenterSection: IRoutes = {
  name: "Help Center Section ",
  path: PATH.HELP_CENTER_SECTION,
  exact: true,
  isPrivate: true,
  helpCenterRoute: true,
  hiddenRoute: true,
  Component: () => <Section />,
};
