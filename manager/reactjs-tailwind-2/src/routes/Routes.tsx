import { flattenRoutes } from "common/functions";
import { IRoutes } from "common/typings";

import * as home from "./components/PublicManager";
import * as karaoke from "./components/KaraokeManager";
import * as company from "./components/CompanyManager";
import * as careStaff from "./components/CareStaffManager";

const karaokeRoutes: IRoutes[] = [
  karaoke.overviewRoute,
  karaoke.bookingRoute,
  karaoke.roomRoute,
  karaoke.customersRoute,
  karaoke.dealRoute,
  karaoke.statisticRoute,
  karaoke.settingRoute,
];

const companyRoutes: IRoutes[] = [
  company.judgementRoute,
  company.marketplaceRoute,
  company.documentRoute,
  company.projectRoute,
  company.settingRoute,
];

const careStaffRoutes: IRoutes[] = [
  careStaff.customerCaredRoute,
  careStaff.careStaffInformationRoute,
];

const otherRoutes: IRoutes[] = [
  home.rootRoute,
  home.homeRoutes,
  home.authRoutes,
  home.registerRoutes,
  home.notFoundRoutes,
];

const allRoutes = [
  ...otherRoutes,
  ...karaokeRoutes,
  ...companyRoutes,
  ...careStaffRoutes,
];

const flattenedRoutes = flattenRoutes(allRoutes);
const flattenedAuthRoutes = flattenRoutes([home.authRoutes]);
const { notFoundRoutes, homeRoutes, shareLinkRouter } = home;

export {
  allRoutes,
  flattenedRoutes,
  flattenedAuthRoutes,
  notFoundRoutes,
  homeRoutes,
  shareLinkRouter,
  karaokeRoutes,
  companyRoutes,
  careStaffRoutes,
};
