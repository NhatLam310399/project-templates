import { useCallback, useEffect, useState } from "react";
import { IRootState } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";

import { IAccount } from "common/typings";
import { getLoggedInUser, isAuthenticated } from "common/utils/auth";
import { PATH } from "constants/routes";

import { removeCurrentUser } from "redux/actions/auth";
import { cleanPlace } from "redux/actions/place";
import { useRedirect } from "./useRedirect";

const useAuth = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const { isLogoutAction, currentUser } = useSelector(
    (state: IRootState) => state.auth,
  );
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setIsAuth(true);
    } else {
      dispatch(cleanPlace());
      setIsAuth(false);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   if (isLogoutAction) {
  //     setIsAuth(false);
  //   } else {
  //     // to make sure data won't be lacked
  //     setIsAuth();
  //   }
  // }, [isLogoutAction]);

  const logout = useCallback(() => {
    isAuth && setIsAuth(false);
    dispatch(removeCurrentUser());
    dispatch(cleanPlace());
    redirect(PATH.ACCOUNT.LOGIN);
  }, [isAuth]);
  return { isAuth, currentUser, logout };
};

export default useAuth;
