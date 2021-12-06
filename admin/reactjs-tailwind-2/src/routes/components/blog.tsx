import { lazy } from "react";
import { IRoutes } from "common/formatTypes";
import { PATH } from "constants/routes";
import * as icons from "designs/Icons/Drawer";
import { t } from "language";

const BlogPost = lazy(() => import("pages/dashboard/Blog/Post"));
const BlogCategory = lazy(() => import("pages/dashboard/Blog/Category"));
const BlogTags = lazy(() => import("pages/dashboard/Blog/Tags"));

export const blogRoutes: IRoutes = {
    name: t("drawer.blog-management"),
    path: PATH.BLOG.SELF,
    exact: true,
    isPrivate: true,
    Icon: icons.Blog,
    permission: "MANAGER",
    children: [
        {
            name: t("drawer.blog-list"),
            path: PATH.BLOG.POST,
            exact: true,
            Component: BlogPost,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.blog-category"),
            path: PATH.BLOG.CATEGORY,
            exact: true,
            Component: BlogCategory,
            isPrivate: true,
            permission: "MANAGER",
        },
        {
            name: t("drawer.blog-tags"),
            path: PATH.BLOG.TAGS,
            exact: true,
            Component: BlogTags,
            isPrivate: true,
            permission: "MANAGER",
        },
    ],
};
