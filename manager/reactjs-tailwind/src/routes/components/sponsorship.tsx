import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import SponsorshipIcon from "icons/Dashboard/Sponsorship";

const Sponsorship = lazy(() => import("../../pages/dashboard/Sponsorship"));
export const sponsorshipRoute: IRoutes = {
  name: "Sponsorship",
  path: PATH.SPONSORSHIP,
  exact: true,
  Component: Sponsorship,
  isPrivate: true,
  Icon: <SponsorshipIcon />,
};
