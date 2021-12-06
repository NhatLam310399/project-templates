import { dashboardRoutes } from "./components/dashboard";
import { rootRoute, authRoutes, notFoundRoutes } from "./components/publics";
import { orderRoute } from "./components/order";
import {
  productTemplatesRoute,
  productTemplatesDetailRoute,
} from "./components/productTemplates";
import { statisticsRoute } from "./components/statistics";
import {
  fundraisingRoute,
  fundraisingCampaignRoute,
} from "./components/fundraising";
import { affiliateRoute } from "./components/affiliate";
import { partnerProgramRoute } from "./components/partnerProgram";
import { fileLibrariesRoute } from "./components/fileLibraries";
import { storeRoute } from "./components/store";
import { billingRoute } from "./components/billing";
import { sponsorshipRoute } from "./components/sponsorship";
import { settingRoute } from "./components/setting";
import {
  helpRoute,
  helpCenterRoute,
  helpCenterDetail,
  helpCenterArtical,
  helpCenterSection,
} from "./components/help";
import { IRoute, IRoutes } from "typings";

const flattenRoutes = (routes: IRoutes[]): IRoutes[] => {
  let flatRoutes: IRoutes[] = [];
  routes = routes || [];
  routes.forEach(item => {
    flatRoutes.push(item);
    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const mainRoutes: IRoutes[] = [
  // Dashboard routes (they will be rendered as navigate in drawer)
  dashboardRoutes,
  orderRoute,
  productTemplatesRoute,
  statisticsRoute,
  fundraisingRoute,
  fundraisingCampaignRoute,
  partnerProgramRoute,
  affiliateRoute,
  sponsorshipRoute,
  fileLibrariesRoute,
  storeRoute,
  billingRoute,
  settingRoute,
  helpRoute,
  // Hidden routes (Make sure you set hiddenRoute: true)
  productTemplatesDetailRoute,
  helpCenterRoute,
  helpCenterArtical,
  helpCenterDetail,
  helpCenterSection,
];

const publicRoutes: IRoutes[] = [rootRoute, authRoutes, notFoundRoutes];

const allRoutes = [...publicRoutes, ...mainRoutes];

const flattenedRoutes = flattenRoutes(allRoutes);
const flattenedAuthRoutes = flattenRoutes([authRoutes]);

export {
  allRoutes,
  flattenedRoutes,
  flattenedAuthRoutes,
  notFoundRoutes,
  mainRoutes as dashboardRoutes,
};
