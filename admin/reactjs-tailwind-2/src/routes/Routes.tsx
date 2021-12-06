import { IRoute, IRoutes } from "common/formatTypes";
// import routes
import { rootRoute, authRoutes, notFoundRoutes } from "./components/publics";
import { overviewRoutes } from "./components/overview";
import { locationRoutes } from "./components/location";
import { userListRoutes } from "./components/userList";
import { postConfiguration } from "./components/postConfiguration";
import { blogRoutes } from "./components/blog";
import {
    manageEmployerRoutes,
    addEmployerRoutes,
    addCompanyRoutes,
} from "./components/manageEmployer";
import { evaluateRoutes } from "./components/evaluate";
import { generalSettingRoutes } from "./components/generalSetting";
import { jobRoutes } from "./components/job";
import { contactRoutes } from "./components/contact";
import { otherSettingRoutes } from "./components/otherSetting";

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
    userListRoutes,
    evaluateRoutes,
    postConfiguration,
    jobRoutes,
    manageEmployerRoutes,
    blogRoutes,
    locationRoutes,
    contactRoutes,
    otherSettingRoutes,
    generalSettingRoutes,
    // statisticRoutes,
];

const publicRoutes: IRoutes[] = [rootRoute, authRoutes, notFoundRoutes];

const allRoutes = [
    ...publicRoutes,
    ...dashboardRoutes,
    authRoutes,
    addEmployerRoutes,
    addCompanyRoutes,
];

const flattenedRoutes = flattenRoutes(allRoutes);
const flattenedAuthRoutes = flattenRoutes([authRoutes]);

export {
    allRoutes,
    flattenedRoutes,
    flattenedAuthRoutes,
    notFoundRoutes,
    dashboardRoutes,
};
