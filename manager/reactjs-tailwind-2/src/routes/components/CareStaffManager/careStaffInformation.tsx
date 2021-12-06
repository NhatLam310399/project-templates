import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { CareStaffInfo as CustomerCareIcon } from "designs/icons/Drawer";

const CareStaffInfo = lazy(() => import("pages/dashboard/CareStaffInfo"));
export const careStaffInformationRoute: IRoutes = {
  name: "Thông tin tài khoàn",
  path: PATH.CUSTOMER_CARE.ACCOUNT_INFO,
  exact: true,
  Component: CareStaffInfo,
  isPrivate: true,
  Icon: CustomerCareIcon,
};
