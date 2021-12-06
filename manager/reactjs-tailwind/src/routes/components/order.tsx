import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import OrderIcon from "icons/Dashboard/Order";

const ListOrder = lazy(() => import("pages/dashboard/Order/ListOrder"));
const ImportOrder = lazy(() => import("pages/dashboard/Order/ImportOrder"));

export const orderRoute: IRoutes = {
  name: "Order",
  path: PATH.ORDER.SELF,
  exact: true,
  isPrivate: true,
  Icon: <OrderIcon />,
  children: [
    {
      name: "List Order",
      path: PATH.ORDER.LIST,
      isPrivate: true,
      Component: ListOrder,
    },
    {
      name: "Import",
      path: PATH.ORDER.IMPORT,
      isPrivate: true,
      Component: ImportOrder,
    },
  ],
};
