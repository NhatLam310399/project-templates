import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";
import { removeCurrentUser } from "redux/actions/auth";
import { store } from "index";
import { IAccount, IDecodeToken } from "common/typings";

const cookies = new Cookies();

const cookieKey = "KTV_MANAGER";

const getUserCookies = () => {
  return cookies.get(cookieKey);
};

const getLoggedInUser = (): IAccount | null => {
  const user = getUserCookies();
  return user ? (typeof user === "object" ? user : JSON.parse(user)) : null;
};

/**
 * Checks if user is authenticated
 */
const isAuthenticated = (): boolean => {
  const user = getLoggedInUser();

  if (!user) {
    return false;
  }

  try {
    const token = user?.token || user?.accessToken || "";
    const decoded: IDecodeToken = jwtDecode(token);
    if (!decoded) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const removeUserCookies = () => {
  cookies.remove(cookieKey, { path: "/" });
};

const setUserCookies = (data: IAccount): void => {
  const decodedToken: IDecodeToken = jwtDecode(
    data?.token || data?.accessToken || "",
  );
  const { exp } = decodedToken || {};

  const timeNow = new Date().getTime();
  const shortExp = timeNow + 5 * 3600 * 1000; // 5 hours

  const expires = exp ? new Date(exp * 1000) : new Date(shortExp);
  cookies.set(cookieKey, data, {
    path: "/",
    expires,
  });
};

export {
  isAuthenticated,
  getLoggedInUser,
  setUserCookies,
  getUserCookies,
  removeUserCookies,
};
