import { lazy } from "react";
import { PATH } from "constants/routes";

import { IRoutes } from "common/typings";
import { ProjectIcon } from "designs/icons/Drawer";

const Project = lazy(() => import("pages/dashboard/Project"));
export const projectRoute: IRoutes = {
  name: "Thông tin dự án",
  path: PATH.PROJECT,
  exact: true,
  Component: Project,
  isPrivate: true,
  Icon: ProjectIcon,
};
