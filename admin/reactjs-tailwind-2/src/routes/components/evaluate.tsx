import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import { t } from "language";
import * as icons from "designs/Icons/Drawer";

const Point = lazy(() => import("pages/dashboard/Evaluate/Point"));
const EvaluateJobSeeker = lazy(
    () => import("pages/dashboard/Evaluate/JobSeeker"),
);

export const evaluateRoutes: IRoutes = {
    name: t("drawer.rating"),
    path: PATH.EVALUATE.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.Evaluate,
    permission: "MANAGER",
    children: [
        {
            name: t("drawer.rating-points"),
            path: PATH.EVALUATE.POINT,
            exact: true,
            Component: Point,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.rating-job-seeker"),
            path: PATH.EVALUATE.JOB_SEEKER,
            exact: true,
            Component: EvaluateJobSeeker,
            isPrivate: true,
            permission: "MANAGER",
        },
    ],
};
