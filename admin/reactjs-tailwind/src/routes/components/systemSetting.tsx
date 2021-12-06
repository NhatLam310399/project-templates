import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { SystemSettingIcon } from "designs/icons/Drawer";

const HotCompanies = lazy(
  () => import("pages/dashboard/systemSetting/HotCompanies"),
);

const HotKaraoke = lazy(
  () => import("pages/dashboard/systemSetting/HotKaraokes"),
);

const HotStaff = lazy(() => import("pages/dashboard/systemSetting/HotStaff"));

const HotProducts = lazy(
  () => import("pages/dashboard/systemSetting/HotProducts"),
);
const HotDocuments = lazy(
  () => import("pages/dashboard/systemSetting/HotDocuments"),
);

const AdsByImage = lazy(
  () => import("pages/dashboard/systemSetting/AdsByImage"),
);

const StaticPage = lazy(
  () => import("pages/dashboard/systemSetting/StaticPage"),
);
``;

export const systemSettingRoutes: IRoutes = {
  name: "Cài đặt hệ thống",
  path: PATH.SYSTEM_SETTING.SELF,
  exact: true,
  isPrivate: true,
  Icon: SystemSettingIcon,
  children: [
    {
      name: "Công ty nổi bật",
      path: PATH.SYSTEM_SETTING.OUTSTANDING_COMPANY,
      exact: true,
      Component: HotCompanies,
      isPrivate: true,
    },
    {
      name: "Quán karaoke nổi bật",
      path: PATH.SYSTEM_SETTING.OUTSTANDING_KARAOKE,
      exact: true,
      Component: HotKaraoke,
      isPrivate: true,
    },
    {
      name: "Nhân viên nổi bật",
      path: PATH.SYSTEM_SETTING.OUTSTANDING_STAFFS,
      exact: true,
      Component: HotStaff,
      isPrivate: true,
    },
    {
      name: "Sản phẩm nổi bật",
      path: PATH.SYSTEM_SETTING.OUTSTANDING_PRODUCT,
      exact: true,
      Component: HotProducts,
      isPrivate: true,
    },
    {
      name: "Tài liệu nổi bật",
      path: PATH.SYSTEM_SETTING.OUTSTANDING_DOCUMENTS,
      exact: true,
      Component: HotDocuments,
      isPrivate: true,
    },
    {
      name: "Quảng cáo theo ảnh",
      path: PATH.SYSTEM_SETTING.ADS_BY_IMAGE,
      exact: true,
      Component: AdsByImage,
      isPrivate: true,
    },
    {
      name: "Trang tĩnh",
      path: PATH.SYSTEM_SETTING.STATIC_PAGES,
      exact: true,
      Component: StaticPage,
      isPrivate: true,
    },
  ],
};
