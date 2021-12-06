import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAccount } from "common/typings";
import { getLoggedInAccount, isAuthenticated } from "common/utils/auth";
import { removeCurrentUser } from "redux/actions/auth";
import { IRootState } from "redux/reducers";
import { useHistory } from "react-router";
import { PATH } from "constants/routes";

const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
    history.push(PATH.ACCOUNT.LOGIN);
  }, []);

  return { isAuth, accountInfo, logout };
};

export default useAuth;
