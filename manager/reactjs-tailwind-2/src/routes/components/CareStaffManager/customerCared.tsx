import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { CustomerCared as CustomerCareIcon } from "designs/icons/Drawer";

const CustomerCared = lazy(() => import("pages/dashboard/CustomerCared"));
export const customerCaredRoute: IRoutes = {
  name: "Chăm sóc khách hàng",
  path: PATH.CUSTOMER_CARE.CARED,
  exact: true,
  Component: CustomerCared,
  isPrivate: true,
  Icon: CustomerCareIcon,
};
