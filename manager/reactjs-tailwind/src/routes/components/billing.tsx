import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import BillingIcon from "icons/Dashboard/Billing";

const Payment = lazy(() => import("pages/dashboard/Billing/Payment"));
const Method = lazy(() => import("pages/dashboard/Billing/Method"));
const Work = lazy(() => import("pages/dashboard/Billing/Work"));
const Wallet = lazy(() => import("pages/dashboard/Billing/Wallet"));
export const billingRoute: IRoutes = {
  name: "Billing",
  path: PATH.BILLING.SELF,
  isPrivate: true,
  Icon: <BillingIcon />,
  children: [
    {
      name: "How does billing work ?",
      path: PATH.BILLING.WORK,
      Component: Work,
      exact: true,
      isPrivate: true,
    },
    {
      name: "Payment",
      path: PATH.BILLING.PAYMENT,
      Component: Payment,
      exact: true,
      isPrivate: true,
    },
    {
      name: "Billing methods",
      path: PATH.BILLING.METHODS,
      Component: Method,
      exact: true,
      isPrivate: true,
    },
    {
      name: "Kingify wallet",
      path: PATH.BILLING.WALLET,
      Component: Wallet,
      exact: true,
      isPrivate: true,
    },
    {
      name: "Discounts",
      path: PATH.BILLING.DISCOUNTS,
      Component: () => <div>Billing discounts</div>,
      exact: true,
      isPrivate: true,
    },
  ],
};
