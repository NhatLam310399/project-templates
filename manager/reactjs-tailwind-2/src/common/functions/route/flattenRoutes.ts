import { IRoute, IRoutes } from "common/typings";

export const flattenRoutes = (routes: IRoutes[]): IRoute[] => {
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
