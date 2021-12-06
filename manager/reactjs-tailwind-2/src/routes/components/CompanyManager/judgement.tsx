import { lazy } from "react";
import { IRoute, IRoutes } from "common/typings";
import { PATH } from "constants/routes";

import { RatingIcon } from "designs/icons/Drawer";

const Judgement = lazy(() => import("pages/dashboard/Judgement"));

export const judgementRoute: IRoutes = {
  name: "Đánh giá",
  path: PATH.JUDGEMENT,
  exact: true,
  isPrivate: true,
  Component: Judgement,
  Icon: RatingIcon,
};
