import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { CustomerCare } from "designs/icons/Drawer";

const Cared = lazy(() => import("pages/dashboard/CustomerCare"));

export const customerCareRoutes: IRoutes = {
  name: "Chăm sóc khách hàng",
  path: PATH.CUSTOMER_CARE,
  exact: true,
  isPrivate: true,
  Icon: CustomerCare,
  Component: Cared,
};
