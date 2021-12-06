import { PATH } from "constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeCurrentUser } from "redux/actions/auth";
import { removeUserCookies } from "common/utils/auth";
import {
  setExtendDrawerDropdown,
  setExtendDrawer,
} from "redux/actions/_config";
import { IRootState } from "redux/reducers";
import { cleanPlace } from "redux/actions/place";

interface IDropDownMenu {
  className?: string;
}

const dropDownStyle =
  "block w-full py-1 px-2 bg-line text-sm text-primary hover:text-error leading-none";

const DropDownMenu: React.FC<IDropDownMenu> = props => {
  const { className } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { isExtendDrawerDropdown } = useSelector(
    (state: IRootState) => state._config,
  );
  const handleUserLogout = () => {
    removeUserCookies();
    dispatch(removeCurrentUser());
    dispatch(setExtendDrawerDropdown(!isExtendDrawerDropdown));
    dispatch(cleanPlace());
    history.push(PATH.ACCOUNT.LOGIN);
  };
  const handleClick = () => {
    dispatch(setExtendDrawerDropdown(!isExtendDrawerDropdown));
    dispatch(setExtendDrawer(false));
  };
  return (
    <div className={className}>
      <Link
        className={dropDownStyle}
        to={
          currentUser?.userInfo?.permission === "CARE_STAFF"
            ? PATH.CUSTOMER_CARE.ACCOUNT_INFO
            : PATH.SETTING
        }
        onClick={handleClick}
      >
        Thông tin cá nhân
      </Link>
      <button
        type="button"
        className={`text-left ${dropDownStyle}`}
        onClick={handleUserLogout}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default DropDownMenu;
