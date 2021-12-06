import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { BusinessManagementIcon } from "designs/icons/Drawer";

const Karaokes = lazy(
  () => import("pages/dashboard/businessManagement/Karaokes"),
);

const KaraokeDetail = lazy(
  () => import("pages/dashboard/businessManagement/Karaokes/KaraokeDetail"),
);

const Requests = lazy(
  () => import("pages/dashboard/businessManagement/Requests"),
);

const RequestDetail = lazy(
  () => import("pages/dashboard/businessManagement/Requests/RequestDetail"),
);

const Companies = lazy(
  () => import("pages/dashboard/businessManagement/Companies"),
);

const CompanyDetail = lazy(
  () => import("pages/dashboard/businessManagement/Companies/CompanyDetail"),
);

export const businessManagementRoutes: IRoutes = {
  name: "Quản lý doanh nghiệp",
  path: PATH.BUSINESS_MANAGEMENT.SELF,
  isPrivate: true,
  exact: false,
  Icon: BusinessManagementIcon,
  children: [
    {
      name: "Yêu cầu xét duyệt",
      path: PATH.BUSINESS_MANAGEMENT.REQUEST,
      exact: true,
      Component: Requests,
      isPrivate: true,
    },
    {
      name: "Công ty uy tín",
      path: PATH.BUSINESS_MANAGEMENT.COMPANY,
      exact: true,
      Component: Companies,
      isPrivate: true,
    },
    {
      name: "Quán karaoke",
      path: PATH.BUSINESS_MANAGEMENT.KARAOKE,
      exact: true,
      Component: Karaokes,
      isPrivate: true,
    },
    {
      name: "Xét duyệt chi tiết",
      path: PATH.BUSINESS_MANAGEMENT.REQUEST_DETAIL,
      exact: true,
      Component: RequestDetail,
      isPrivate: true,
      hiddenRoute: true,
    },
    {
      name: "Quán karaoke chi tiết",
      path: PATH.BUSINESS_MANAGEMENT.KARAOKE_DETAIL,
      exact: true,
      Component: KaraokeDetail,
      isPrivate: true,
      hiddenRoute: true,
    },
    {
      name: "Công ty uy tín chi tiết",
      path: PATH.BUSINESS_MANAGEMENT.COMPANY_DETAIL,
      exact: true,
      Component: CompanyDetail,
      isPrivate: true,
      hiddenRoute: true,
    },
  ],
};
