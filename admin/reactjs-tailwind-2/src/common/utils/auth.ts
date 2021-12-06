import { IAuth, IDecodeToken } from "common/formatTypes";
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";
import { store } from "index";
import { actionRemoveCurrentUser } from "redux/actions/auth";

const cookies = new Cookies();

const cookieKey = "TUYENDUNGVN_ADMIN_KEY";

const getUserCookies = () => {
    return cookies.get(cookieKey);
};

/**
 * Returns the logged in user
 */
const getLoggedInAdmin = (): IAuth => {
    const account: IAuth = getUserCookies();

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
    const user = getLoggedInAdmin();
    if (!user) {
        return false;
    }
    const decoded: IDecodeToken = jwtDecode(user?.accessToken || "");
    const currentTime = Date.now() / 1000;
    if (currentTime > decoded.exp) {
        removeUserCookies();
        store.dispatch(actionRemoveCurrentUser());
        return false;
    }
    return true;
};

const setUserCookies = (data: IAuth): void => {
    cookies.set(cookieKey, data, { path: "/" });
};

export {
    isAuthenticated,
    getLoggedInAdmin,
    setUserCookies,
    removeUserCookies,
    getUserCookies,
};
