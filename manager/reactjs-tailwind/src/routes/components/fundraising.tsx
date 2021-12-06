import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import FundraisingIcon from "icons/Dashboard/Fundraising";

const Fundraising = lazy(() => import("pages/dashboard/Fundraising/Overview"));
const FundraisingCampaign = lazy(
  () => import("pages/dashboard/Fundraising/YourCampaigns"),
);

export const fundraisingRoute: IRoutes = {
  name: "Fundraising",
  path: PATH.FUNDRAISING,
  exact: true,
  Component: Fundraising,
  isPrivate: true,
  Icon: <FundraisingIcon />,
};

export const fundraisingCampaignRoute: IRoutes = {
  name: "Fundraising",
  path: PATH.FUNDRAISING_CAMPAIGN,
  exact: true,
  Component: FundraisingCampaign,
  isPrivate: true,
  Icon: <FundraisingIcon />,
  hiddenRoute: true,
};
