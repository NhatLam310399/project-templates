import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import ProductTemplatesIcon from "icons/Dashboard/ProductTemplates";

const ProductTemplate = lazy(() => import("pages/dashboard/ProductTemplate"));
const ProductTemplateDetail = lazy(
  () => import("pages/dashboard/ProductTemplateDetail"),
);

export const productTemplatesRoute: IRoutes = {
  name: "Product Templates",
  path: PATH.PRODUCT_TEMPLATE,
  exact: true,
  Component: ProductTemplate,
  isPrivate: true,
  Icon: <ProductTemplatesIcon />,
};

export const productTemplatesDetailRoute: IRoutes = {
  name: "Product Template Detail",
  path: PATH.PRODUCT_TEMPLATE_DETAIL,
  exact: true,
  Component: ProductTemplateDetail,
  isPrivate: true,
  hiddenRoute: true,
};
