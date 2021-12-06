import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { DocumentIcon } from "designs/icons/Drawer";

const Document = lazy(() => import("pages/dashboard/Document"));
export const documentRoute: IRoutes = {
  name: "Tài liệu",
  path: PATH.DOCUMENT,
  exact: true,
  Component: Document,
  isPrivate: true,
  Icon: DocumentIcon,
};
