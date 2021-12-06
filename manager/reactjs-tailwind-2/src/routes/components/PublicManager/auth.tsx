import { lazy } from "react";
import { IRoutes } from "common/typings";
import { PATH } from "constants/routes";

const InputPage = lazy(() => import("pages/Register"));
const Login = lazy(() => import("pages/Login"));

export const registerRoutes: IRoutes = {
  name: "register",
  path: PATH.REGISTER.SELF,
  isPrivate: false,
  children: [
    {
      name: "input",
      path: PATH.REGISTER.INPUT,
      Component: InputPage,
      isPrivate: false,
    },
  ],
};
export const authRoutes: IRoutes = {
  name: "auth",
  path: PATH.ACCOUNT.SELF,
  isPrivate: false,
  children: [
    {
      name: "login",
      path: PATH.ACCOUNT.LOGIN,
      Component: Login,
      isPrivate: false,
    },
  ],
};
