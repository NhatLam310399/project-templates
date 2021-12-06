import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { CustomersIcon } from "designs/icons/Drawer";

const Customers = lazy(() => import("pages/dashboard/Customers/List"));
const CustomerDetail = lazy(
  () => import("pages/dashboard/Customers/CustomerDetail"),
);
export const customersRoute: IRoutes = {
  name: "Khách hàng",
  path: PATH.CUSTOMERS.SELF,
  exact: true,
  isPrivate: true,
  Icon: CustomersIcon,
  children: [
    {
      name: "Khách hàng",
      path: PATH.CUSTOMERS.SELF,
      Component: Customers,
      isPrivate: true,
    },
    {
      name: "Thông tin chi tiết",
      path: PATH.CUSTOMERS.DETAIL,
      Component: CustomerDetail,
      isPrivate: true,
    },
  ],
};
