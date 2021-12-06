import { lazy } from "react";
import { Redirect } from "react-router";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import NotFound from "pages/NotFound";

// Import Route Components
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));
const ForgotPassword = lazy(() => import("pages/ForgotPassword"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));

export const rootRoute: IRoutes = {
  name: "Root",
  exact: true,
  path: "/",
  Component: () => <Redirect to={PATH.DASHBOARD} />,
  isPrivate: true,
};

export const authRoutes: IRoutes = {
  name: "auth",
  path: PATH.AUTH.SELF,
  isPrivate: false,
  children: [
    {
      name: "Login",
      path: PATH.AUTH.LOGIN,
      Component: Login,
      isPrivate: false,
    },
    {
      name: "Register",
      path: PATH.AUTH.REGISTER,
      Component: Register,
      isPrivate: false,
    },
    {
      name: "Forgot password",
      path: PATH.AUTH.FORGOT_PASSWORD,
      Component: ForgotPassword,
      isPrivate: false,
    },
    {
      name: "Reset password",
      path: PATH.AUTH.RESET_PASSWORD,
      Component: ResetPassword,
      isPrivate: false,
    },
  ],
};

// Not Found page
export const notFoundRoutes: IRoutes = {
  name: "Not Found",
  path: PATH.NOT_FOUND,
  exact: false,
  Component: NotFound,
  isPrivate: false,
};
