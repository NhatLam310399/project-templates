import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { UserManagementIcon } from "designs/icons/Drawer";

// Import Route Components
const ListUsers = lazy(
  () => import("pages/dashboard/userManagement/ListUsers"),
);
const Administrator = lazy(
  () => import("pages/dashboard/userManagement/Administrator"),
);
const CustomerCareStaff = lazy(
  () => import("pages/dashboard/userManagement/CustomerCareStaff"),
);
const SystemStaff = lazy(
  () => import("pages/dashboard/userManagement/SystemStaff"),
);

export const userManagementRoutes: IRoutes = {
  name: "Quản lý người dùng",
  path: PATH.USER_MANAGEMENT.SELF,
  exact: true,
  isPrivate: true,
  Icon: UserManagementIcon,
  children: [
    // {
    //   name: "Thêm tài khoản",
    //   path: PATH.USER_MANAGEMENT.ADD,
    //   exact: true,
    //   Component: ListUsers,
    //   isPrivate: true,
    // },
    {
      name: "Người dùng",
      path: PATH.USER_MANAGEMENT.LIST_USERS,
      exact: true,
      Component: ListUsers,
      isPrivate: true,
    },
    {
      name: "Quản trị viên",
      path: PATH.USER_MANAGEMENT.ADMINISTRATOR,
      exact: true,
      Component: Administrator,
      isPrivate: true,
    },
    {
      name: "Nhân viên hệ thống",
      path: PATH.USER_MANAGEMENT.SYSTEM_STAFF,
      exact: true,
      Component: SystemStaff,
      isPrivate: true,
    },
    {
      name: "Nhân viên chăm sóc",
      path: PATH.USER_MANAGEMENT.CUSTOMER_CARE_STAFF,
      exact: true,
      Component: CustomerCareStaff,
      isPrivate: true,
    },
  ],
};
