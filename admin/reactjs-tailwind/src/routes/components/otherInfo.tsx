import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { OtherInfoIcon } from "designs/icons/Drawer";

const NotificationInfo = lazy(
  () => import("pages/dashboard/otherInfo/NotificationInfo"),
);

export const othersInfoRoutes: IRoutes = {
  name: "Thông tin khác",
  path: PATH.OTHER_INFO.SELF,
  exact: true,
  isPrivate: true,
  Icon: OtherInfoIcon,
  children: [
    // {
    //   name: "Danh sách mail gửi",
    //   path: PATH.OTHER_INFO.MAILS,
    //   exact: true,
    //   Component: Overview,
    //   isPrivate: true,
    // },
    {
      name: "Thông báo",
      path: PATH.OTHER_INFO.NOTIFICATION,
      exact: true,
      Component: NotificationInfo,
      isPrivate: true,
    },
  ],
};
