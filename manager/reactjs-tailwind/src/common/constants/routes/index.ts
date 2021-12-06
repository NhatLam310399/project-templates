export const PATH = {
  NOT_FOUND: "/not-found",
  AUTH: {
    SELF: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  // Dashboard routes
  DASHBOARD: "/dashboard",
  ORDER: {
    SELF: "/order",
    LIST: "/order/list",
    IMPORT: "/order/import",
  },
  PRODUCT_TEMPLATE: "/product-template",
  PRODUCT_TEMPLATE_DETAIL: "/product-template/:id",
  STATISTIC: "/statistic",
  FUNDRAISING: "/fundraising",
  FUNDRAISING_CAMPAIGN: "/fundraising/campaign",
  PARTNER_PROGRAM: "/partner-program",
  AFFILIATE: {
    SELF: "/affiliate",
    OVERALL: "/affiliate/overall",
    STATISTICS: "/affiliate/statistics",
    LINK: "/affiliate/link",
    LEGAL_INFO: "/affiliate/legal-info",
    GUIDELINES: "/affiliate/guidelines",
    FAQS: "/affiliate/faqs",
  },
  SPONSORSHIP: "/sponsorship",
  FILE_LIBRARIES: "/file-libraries",
  STORE: "/store",
  BILLING: {
    SELF: "/billing",
    WORK: "/biiling/work",
    PAYMENT: "/billing/payment",
    METHODS: "/billing/method",
    WALLET: "/billing/wallet",
    DISCOUNTS: "/billing/discounts",
  },
  SETTING: {
    SELF: "/setting",
    MY_ACCOUNT: {
      SELF: "/setting/my-account",
      ACCOUNT: "/setting/my-account/account",
      USERS: "/setting/my-account/users",
    },
    STORE: {
      SELF: "/setting/store",
      STORE_SETTING: "/setting/store/store-setting",
      ORDER: "/setting/store/order",
      SHIPPING: "/setting/store/shipping",
      BRANDING: "/setting/store/branding",
      RETURN: "/setting/store/return",
    },
    NOTIFICATION: "/setting/notification",
  },
  HELP: "/help",
  HELP_CENTER: "/help-center",
  HELP_CENTER_DETAIL: "/help-center/:id",
  HELP_CENTER_ARTICAL: "/help-center/artical/:id",
  HELP_CENTER_SECTION: "/help-center/section/:id",
  HOME: "/home",
  PRODUCT_CATALOG: "/product-catalog",
  DESIGN_MAKER: "/design-maker",
} as const;

const getAllStringValuesOfObject = <T>(obj: T): string[] => {
  if (!obj) return [];
  const values: string[] = [];
  for (const key in obj) {
    const currValue = obj[key];
    if (typeof currValue === "string") values.push(currValue);
    else if (typeof currValue === "object")
      values.push(...getAllStringValuesOfObject(currValue));
  }
  return values;
};

export const PATH_URLS = getAllStringValuesOfObject(PATH);
