import { getAllStringValuesOfObject } from "common/functions";

export const PATH = {
  HOME: "/",
  NOT_FOUND: "/not-found",
  ACCOUNT: {
    SELF: "/account",
    LOGIN: "/account/login",
  },
  REGISTER: {
    SELF: "/register",
    INPUT: "/register/input",
    REQUEST: "/register/request",
  },
  OVERVIEW: "/dashboard/overview",
  CUSTOMERS: {
    SELF: "/dashboard/customers",
    DETAIL: "/dashboard/customers/detail/:id",
  },
  ROOM: "/dashboard/room",
  BOOKING: "/dashboard/booking",
  CUSTOMER_CARE: {
    SELF: "/dashboard/customer-care",
    CARED: "/dashboard/customer-care/cared",
    ACCOUNT_INFO: "/dashboard/customer-care/account-info",
  },
  DEAL: "/dashboard/deal",
  MARKETPLACE: "/dashboard/marketplace",
  DOCUMENT: "/dashboard/document",
  STATISTIC: "/dashboard/statistics",
  JUDGEMENT: "/dashboard/judgement",
  SETTING: "/dashboard/setting",
  PROJECT: "/dashboard/project",
  LINK_SHARE: "/share-link",
};

export const PATH_URLS = getAllStringValuesOfObject(PATH);
