import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import AffiliateIcon from "icons/Dashboard/Affiliate";

const FAQs = lazy(() => import("pages/dashboard/Affiliate/FAQs"));
const Guidelines = lazy(() => import("pages/dashboard/Affiliate/Guidelines"));
const LegalInfo = lazy(() => import("pages/dashboard/Affiliate/LegalInfo"));
const Overall = lazy(() => import("pages/dashboard/Affiliate/Overall"));
const AffiliateLink = lazy(
  () => import("pages/dashboard/Affiliate/AffiliateLink"),
);
const Statistics = lazy(() => import("pages/dashboard/Affiliate/Statistics"));
export const affiliateRoute: IRoutes = {
  name: "Affiliate",
  path: PATH.AFFILIATE.SELF,
  isPrivate: true,
  Icon: <AffiliateIcon />,
  children: [
    {
      name: "Overall",
      path: PATH.AFFILIATE.OVERALL,
      isPrivate: true,
      Component: () => <Overall />,
    },
    {
      name: "Statistics",
      path: PATH.AFFILIATE.STATISTICS,
      isPrivate: true,
      Component: () => <Statistics />,
    },
    {
      name: "Affiliate link",
      path: PATH.AFFILIATE.LINK,
      isPrivate: true,
      Component: () => <AffiliateLink />,
    },
    {
      name: "Legal Info",
      path: PATH.AFFILIATE.LEGAL_INFO,
      isPrivate: true,
      Component: () => <LegalInfo />,
    },
    {
      name: "Guidelines",
      path: PATH.AFFILIATE.GUIDELINES,
      isPrivate: true,
      Component: () => <Guidelines />,
    },
    {
      name: "FAQs",
      path: PATH.AFFILIATE.FAQS,
      isPrivate: true,
      Component: () => <FAQs />,
    },
  ],
};
