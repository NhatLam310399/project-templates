import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import PartnerIcon from "icons/Dashboard/Partner";

const PartnerProgram = lazy(() => import("pages/dashboard/PartnerProgram"));

export const partnerProgramRoute: IRoutes = {
  name: "Partner Program",
  path: PATH.PARTNER_PROGRAM,
  exact: true,
  isPrivate: true,
  Component: PartnerProgram,
  Icon: <PartnerIcon />,
};
