const PATH = {
  MAINTAIN: "MAINTAIN",
  COMING_SOON: "COMING_SOON",
  NOT_FOUND: "NOT_FOUND",
  GLOBAL_ARTICLE: "GLOBAL_ARTICLE",

  HOME: "HOME",
  BLOG_DETAIL: "BLOG_DETAIL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  JOB: "JOB",
  JOB_DETAIL: "JOB_DETAIL",
  COMPANY: "COMPANY",
  COMPANY_RECRUITMENT: "COMPANY_RECRUITMENT",
  COMPANY_DETAIL: "COMPANY_DETAIL",
  COMPANY_RESULT: "COMPANY_RESULT",
  ABOUT_USER: "ABOUT_USER",

  ACCOUNT_INFORMATION: "ACCOUNT_INFORMATION",
  ACCOUNT_PROFILE: "ACCOUNT_PROFILE",
  WORK_LOCATION: "WORK_LOCATION",
  ACCOUNT_FAVORITE: "ACCOUNT_FAVORITE",
  ACCOUNT_EDIT_PROFILE: "ACCOUNT_EDIT_PROFILE",
  ACCOUNT_NOTIFICATION: "ACCOUNT_NOTIFICATION",

  JOB_MANAGEMENT_PERSONAL_INFO: "JOB_MANAGEMENT_PERSONAL_INFO",
  JOB_MANAGEMENT_EVALUATED: "JOB_MANAGEMENT_EVALUATED",
  JOB_MANAGEMENT_MYJOB: "JOB_MANAGEMENT_MYJOB",
  JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE: "JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE",
  JOB_MANAGEMENT_CHANGE_PASSWORD: "JOB_MANAGEMENT_CHANGE_PASSWORD",
};

const paths = [
  {
    name: PATH.COMING_SOON,
    locale: {
      vi: "/dang-phat-trien",
      en: "/maintenance/coming-soon",
    },
    isPrivate: false,
  },
  {
    name: PATH.MAINTAIN,
    locale: {
      vi: "/dang-bao-tri",
      en: "/maintenance/loading",
    },
    isPrivate: false,
  },
  {
    name: PATH.NOT_FOUND,
    locale: {
      vi: "/khong-tim-thay",
      en: "/404",
    },
    isPrivate: false,
  },
  {
    name: PATH.HOME,
    locale: {
      vi: "/",
      en: "/home",
    },
    isPrivate: false,
  },
  {
    name: PATH.BLOG_DETAIL,
    locale: {
      vi: "/tin-tuc/:slug",
      en: "/blog-detail/:slug",
    },
  },

  {
    name: PATH.REGISTER,
    locale: {
      vi: "/dang-ky",
      en: "/register",
    },
  },
  {
    name: PATH.LOGIN,
    locale: {
      vi: "/dang-nhap",
      en: "/login",
    },
  },
  {
    name: PATH.FORGOT_PASSWORD,
    locale: {
      vi: "/quen-mat-khau",
      en: "/forgot-password",
    },
  },
  {
    name: PATH.JOB_MANAGEMENT_PERSONAL_INFO,
    locale: {
      vi: "/nguoi-tim-viec/thong-tin-ca-nhan",
      en: "/job-seeker/personal-info",
    },
  },
  {
    name: PATH.JOB_MANAGEMENT_EVALUATED,
    locale: {
      vi: "/nguoi-tim-viec/yeu-cau-danh-gia",
      en: "/job-seeker/evaluated",
    },
  },
  {
    name: PATH.JOB_MANAGEMENT_MYJOB,
    locale: {
      vi: "/nguoi-tim-viec/cong-viec-cua-toi",
      en: "/job-seeker/my-job",
    },
  },
  {
    name: PATH.JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE,
    locale: {
      vi: "/nguoi-tim-viec/nha-tuyen-dung-xem-ho-so",
      en: "/job-seeker/employer-view-profile",
    },
  },
  {
    name: PATH.JOB_MANAGEMENT_CHANGE_PASSWORD,
    locale: {
      vi: "/nguoi-tim-viec/thay-doi-mat-khau",
      en: "/job-seeker/change-password",
    },
  },

  {
    name: PATH.JOB,
    locale: {
      vi: "/viec-lam",
      en: "/job",
    },
  },
  {
    name: PATH.JOB_DETAIL,
    locale: {
      vi: "/viec-lam/:slug",
      en: "/job-detail/:slug",
    },
  },
  {
    name: PATH.COMPANY,
    locale: {
      vi: "/cong-ty",
      en: "/company",
    },
  },
  {
    name: PATH.COMPANY_RECRUITMENT,
    locale: {
      vi: "/thong-tin-cong-ty-tuyen-dung/:slug",
      en: "/recruitment-company-detail/:slug",
    },
  },
  {
    name: PATH.COMPANY_DETAIL,
    locale: {
      vi: "/thong-tin-cong-ty/:slug",
      en: "/company-detail/:slug",
    },
  },
  {
    name: PATH.COMPANY_RESULT,
    locale: {
      vi: "/ket-qua-tim-kiem-cong-ty",
      en: "/company-result",
    },
  },
];

const routes = paths.map((path) => {
  return {
    source: path.locale.vi,
    destination: path.locale.en,
  };
});

module.exports = {
  PATH,
  paths,
  routes,
};
