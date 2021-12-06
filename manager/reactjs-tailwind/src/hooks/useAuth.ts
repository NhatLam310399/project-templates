import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRedirect } from "./useRedirect";
import { IAccount } from "typings";
import { getLoggedInAccount, isAuthenticated } from "common/utils/auth";
import { removeCurrentUser } from "redux/actions/auth";
import { IRootState } from "redux/reducers";
import { PATH } from "common/constants/routes";

const useAuth = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());
  const [accountInfo, setAccountInfo] = useState<IAccount>(
    getLoggedInAccount(),
  );
  const { isLogoutAction } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (isLogoutAction) {
      return setIsAuth(false);
    }
    // to make sure data won't be lacked
    setIsAuth(isAuthenticated());
    setAccountInfo(getLoggedInAccount());
  }, [isLogoutAction]);

  const logout = useCallback(() => {
    dispatch(removeCurrentUser());
    console.log("Logout");
    redirect(PATH.AUTH.LOGIN);
  }, []);

  return { isAuth, accountInfo, logout };
};

export default useAuth;
