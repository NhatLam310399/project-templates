import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { RoomIcon } from "designs/icons/Drawer";

const Room = lazy(() => import("pages/dashboard/Room"));

export const roomRoute: IRoutes = {
  name: "Quản lý phòng",
  path: PATH.ROOM,
  exact: true,
  Component: Room,
  isPrivate: true,
  Icon: RoomIcon,
};
