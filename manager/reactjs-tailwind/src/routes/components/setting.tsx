import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import SettingIcon from "icons/Dashboard/Setting";

//account
const Users = lazy(
  () => import("pages/dashboard/systemSetting/accountSetting/Users"),
);
const Account = lazy(
  () => import("pages/dashboard/systemSetting/accountSetting/Account"),
);

//store
const StoreSetting = lazy(
  () => import("pages/dashboard/systemSetting/store/StoreSetting"),
);
const Orders = lazy(() => import("pages/dashboard/systemSetting/store/Orders"));
const Shipping = lazy(
  () => import("pages/dashboard/systemSetting/store/Shipping"),
);
const Branding = lazy(
  () => import("pages/dashboard/systemSetting/store/Branding"),
);
const Returns = lazy(
  () => import("pages/dashboard/systemSetting/store/Returns"),
);

//notification
const Notification = lazy(
  () => import("pages/dashboard/systemSetting/notification"),
);

export const settingRoute: IRoutes = {
  name: "Setting",
  path: PATH.SETTING.SELF,
  isPrivate: true,
  Icon: <SettingIcon />,
  children: [
    {
      name: "Account setting",
      path: PATH.SETTING.MY_ACCOUNT.SELF,
      exact: true,
      isPrivate: true,
      children: [
        {
          name: "My account",
          path: PATH.SETTING.MY_ACCOUNT.ACCOUNT,
          Component: Account,
          exact: true,
          isPrivate: true,
        },
        {
          name: "Users",
          path: PATH.SETTING.MY_ACCOUNT.USERS,
          Component: Users,
          exact: true,
          isPrivate: true,
        },
      ],
    },
    {
      name: "Store",
      path: PATH.SETTING.STORE.SELF,
      exact: true,
      isPrivate: true,
      children: [
        {
          name: "Store setting",
          path: PATH.SETTING.STORE.STORE_SETTING,
          exact: true,
          isPrivate: true,
          Component: StoreSetting,
        },
        {
          name: "Orders",
          path: PATH.SETTING.STORE.ORDER,
          exact: true,
          isPrivate: true,
          Component: Orders,
        },
        {
          name: "Shipping",
          path: PATH.SETTING.STORE.SHIPPING,
          exact: true,
          isPrivate: true,
          Component: Shipping,
        },
        {
          name: "Branding",
          path: PATH.SETTING.STORE.BRANDING,
          exact: true,
          isPrivate: true,
          Component: Branding,
        },
        {
          name: "Returns",
          path: PATH.SETTING.STORE.RETURN,
          exact: true,
          isPrivate: true,
          Component: Returns,
        },
      ],
    },
    {
      name: "Notification",
      path: PATH.SETTING.NOTIFICATION,
      Component: Notification,
      exact: true,
      isPrivate: true,
    },
  ],
};
