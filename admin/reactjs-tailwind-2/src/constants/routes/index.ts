export const PATH = {
    NOT_FOUND: "/not-found",
    ACCOUNT: {
        SELF: "/account",
        LOGIN: "/account/login",
    },
    // Dashboard routes
    OVERVIEW: "/dashboard/overview",
    USER_LIST: {
        SELF: "/dashboard/user-list",
        USER: "/dashboard/user-list/user-normal",
        ADMIN: "/dashboard/user-list/admin",
        EMPLOYER: "/dashboard/user-list/employer",
        MANAGER: "/dashboard/user-list/manager",
    },
    LOCATION: {
        SELF: "/dashboard/location",
        PROVINCE: "/dashboard/location/province",
        DISTRICT: "/dashboard/location/district",
        WARD: "/dashboard/location/ward",
        STREET: "/dashboard/location/street",
    },
    BLOG: {
        SELF: "/dashboard/blog",
        POST: "/dashboard/blog/post",
        CATEGORY: "/dashboard/blog/category",
        TAGS: "/dashboard/blog/tags",
    },
    MANAGE_NEWS: "/dashboard/manage-news",
    POST_MANAGEMENT: {
        SELF: "/dashboard/config-news",
        FIRST_LEVEL: "/dashboard/config-news/first-level",
        SECOND_LEVEL: "/dashboard/config-news/second-level",
        JOB_LEVELS: "/dashboard/config-news/job-levels",
        JOB_TYPES: "/dashboard/config-news/job-types",
        WELFARE: "/dashboard/config-news/welfare",
        LANGUAGE: "/dashboard/config-news/job-tags",
    },
    JOB: {
        SELF: "/dashboard/job",
        RECRUITMENT_LIST: "/dashboard/job/recruitment-list",
        APPLIED_LIST: "/dashboard/job/applied-list",
        VIEWED: "/dashboard/job/viewed-list",
    },
    EVALUATE: {
        SELF: "/dashboard/evaluate",
        POINT: "/dashboard/evaluate/point",
        JOB_SEEKER: "/dashboard/evaluate/job-seeker",
    },
    STATISTIC: {
        SELF: "/dashboard/statistic",
        EMPLOYER: "/dashboard/statistic/employer",
        JOB_SEEKER: "/dashboard/statistic/job-seeker",
        NEWS: "/dashboard/statistic/news",
    },
    SETTING: {
        SELF: "/dashboard/setting",
        GENERAL: "/dashboard/setting/general-setting",
        SEO: "/dashboard/setting/seo-setting",
        ADS_BY_CODE: "/dashboard/setting/ads-by-code-setting",
        ADS_BY_IMG: "/dashboard/setting/ads-by-img-setting",
        STATIC_PAGE: "/dashboard/setting/static-page-setting",
    },
    COMPANY: {
        SELF: "/dashboard/company",
        LIST: "/dashboard/company/list",
        BENEFIT: "/dashboard/company/benefit",
    },
    GENERAL_SETTING: "/dashboard/general-setting",
    MANAGE_EMPLOYER: {
        SELF: "/dashboard/employer",
        ADD: {
            ACCOUNT: "/dashboard/employer/add/account",
            COMPANY: "/dashboard/employer/add/company",
        },
    },
    CONTACT: "/dashboard/contact",
    OTHER_SETTING: {
        SELF: "/dashboard/other-setting",
        POINT: "/dashboard/other-setting/point-setting",
        NOTIFICATION: "/dashboard/other-setting/notification-setting",
    },
};
