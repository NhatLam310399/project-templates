import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";
import { MajorDocIcon } from "designs/icons/Drawer";

const BaseDocumentList = lazy(
  () => import("pages/dashboard/majorDocs/BaseDocumentList"),
);
const Types = lazy(() => import("pages/dashboard/majorDocs/Types"));
const ExchangeHistory = lazy(
  () => import("pages/dashboard/majorDocs/ExchangeHistory"),
);

export const majorDocsRoutes: IRoutes = {
  name: "Tài liệu có phí",
  path: PATH.MAJOR_DOCS.SELF,
  exact: true,
  isPrivate: true,
  Icon: MajorDocIcon,
  children: [
    {
      name: "Danh sách tài liệu",
      path: PATH.MAJOR_DOCS.LIST,
      exact: true,
      Component: BaseDocumentList,
      isPrivate: true,
    },

    {
      name: "Lịch sử giao dịch",
      path: PATH.MAJOR_DOCS.EXCHANGE_HISTORY,
      exact: true,
      Component: ExchangeHistory,
      isPrivate: true,
    },
    {
      name: "Loại tài liệu",
      path: PATH.MAJOR_DOCS.TYPES,
      exact: true,
      Component: Types,
      isPrivate: true,
    },
  ],
};
