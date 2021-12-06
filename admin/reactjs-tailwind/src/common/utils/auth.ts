import { IAccount, IDecodeToken } from "common/typings";
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";
import { store } from "index";
import { actionRemoveCurrentUser } from "redux/actions/auth";

const cookies = new Cookies();

const cookieKey = "KTV_ADMIN_KEY";

const getUserCookies = () => {
  return cookies.get(cookieKey);
};

/**
 * Returns the logged in user
 */
const getLoggedInAccount = (): IAccount => {
  const account: IAccount = getUserCookies();
  return account
    ? typeof account === "object"
      ? account
      : JSON.parse(account)
    : null;
};

const removeUserCookies = (): void => {
  cookies.remove(cookieKey, { path: "/" });
};

/**
 * Checks if user is authenticated
 */
const isAuthenticated = (): boolean => {
  const user = getLoggedInAccount();

  if (!user) {
    return false;
  }

  try {
    const decoded: IDecodeToken = jwtDecode(
      user?.token || user?.accessToken || "",
    );
    const currentTime = Date.now() / 1000;
    if (currentTime > decoded.exp) {
      removeUserCookies();
      store.dispatch(actionRemoveCurrentUser());
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const setUserCookies = (data: IAccount): void => {
  cookies.set(cookieKey, data, { path: "/" });
};

export {
  isAuthenticated,
  getLoggedInAccount,
  setUserCookies,
  removeUserCookies,
  getUserCookies,
};
