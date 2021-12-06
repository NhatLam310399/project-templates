import { IRoute, IRoutes } from "common/typings";

import { rootRoute, authRoutes, notFoundRoutes } from "./components/publics";

import { overviewRoutes } from "./components/overview";
import { userManagementRoutes } from "./components/userManagement";
import { businessManagementRoutes } from "./components/businessManagement";
import { bookingInfoRoutes } from "./components/bookingInfo";
import { customerCareRoutes } from "./components/customerCare";
import { marketManagementRoutes } from "./components/marketManagement";
import { majorDocsRoutes } from "./components/majorDocs";
import { othersInfoRoutes } from "./components/otherInfo";
import { locationRoutes } from "./components/location";
import { systemSettingRoutes } from "./components/systemSetting";

const flattenRoutes = (routes: IRoutes[]): IRoute[] => {
  let flatRoutes: IRoute[] = [];
  routes = routes || [];
  routes.forEach(item => {
    flatRoutes.push(item);
    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const dashboardRoutes: IRoutes[] = [
  overviewRoutes,
  userManagementRoutes,
  businessManagementRoutes,
  bookingInfoRoutes,
  customerCareRoutes,
  marketManagementRoutes,
  majorDocsRoutes,
  othersInfoRoutes,
  locationRoutes,
  systemSettingRoutes,
];

const publicRoutes: IRoutes[] = [rootRoute, authRoutes, notFoundRoutes];

const allRoutes = [...publicRoutes, ...dashboardRoutes];

const flattenedRoutes = flattenRoutes(allRoutes);
const flattenedAuthRoutes = flattenRoutes([authRoutes]);

export {
  allRoutes,
  flattenedRoutes,
  flattenedAuthRoutes,
  notFoundRoutes,
  dashboardRoutes,
};
