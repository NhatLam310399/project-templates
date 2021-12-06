import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { MarketManagementIcon } from "designs/icons/Drawer";

const ProductList = lazy(
  () => import("pages/dashboard/marketManagement/ProductList"),
);
const Category = lazy(
  () => import("pages/dashboard/marketManagement/Category"),
);
const ExchangeInfo = lazy(
  () => import("pages/dashboard/marketManagement/ExchangeInfo"),
);

export const marketManagementRoutes: IRoutes = {
  name: "Quản lý chợ",
  path: PATH.MARKER_MANAGEMENT.SELF,
  exact: true,
  isPrivate: true,
  Icon: MarketManagementIcon,
  children: [
    {
      name: "Danh sách sản phẩm",
      path: PATH.MARKER_MANAGEMENT.LIST,
      exact: true,
      Component: ProductList,
      isPrivate: true,
    },
    {
      name: "Danh mục sản phẩm",
      path: PATH.MARKER_MANAGEMENT.CATEGORY,
      exact: true,
      Component: Category,
      isPrivate: true,
    },
    {
      name: "Thông tin giao dịch",
      path: PATH.MARKER_MANAGEMENT.EXCHANGE_INFO,
      exact: true,
      Component: ExchangeInfo,
      isPrivate: true,
    },
  ],
};
