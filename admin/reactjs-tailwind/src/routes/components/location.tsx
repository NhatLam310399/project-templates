import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { LocationIcon } from "designs/icons/Drawer";

const Province = lazy(() => import("pages/dashboard/location/Province"));
const District = lazy(() => import("pages/dashboard/location/District"));
const Ward = lazy(() => import("pages/dashboard/location/Ward"));

export const locationRoutes: IRoutes = {
  name: "Cấu hình địa điểm",
  path: PATH.LOCATION.SELF,
  exact: true,
  isPrivate: true,
  Icon: LocationIcon,
  children: [
    {
      name: "Tỉnh/ Thành phố",
      path: PATH.LOCATION.PROVINCE,
      exact: true,
      Component: Province,
      isPrivate: true,
    },
    {
      name: "Quận/ Huyện",
      path: PATH.LOCATION.DISTRICT,
      exact: true,
      Component: District,
      isPrivate: true,
    },
    {
      name: "Phường/ Xã",
      path: PATH.LOCATION.WARD,
      exact: true,
      Component: Ward,
      isPrivate: true,
    },
  ],
};
