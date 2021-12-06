import ArrowIcon from "designs/icons/Arrow";
import { useDispatch, useSelector } from "react-redux";
import { setExtendDrawerDropdown } from "redux/actions/_config";
import { IRootState } from "redux/reducers";
import { useEffect } from "react";
import { getUserById } from "redux/actions/users";
import { SkeletonAvatar } from "designs/Avatar";
import DropDownMenu from "./component/DropDownMenu";

interface IUserInfoProps {
  className?: string;
}

const UserInfo: React.FC<IUserInfoProps> = props => {
  const { className = "" } = props;
  const dispatch = useDispatch();
  const { isExtendDrawerDropdown } = useSelector(
    (state: IRootState) => state._config,
  );
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { place } = useSelector((state: IRootState) => state.place);
  const { user } = useSelector((state: IRootState) => state.users);
  const handleExpandMenu = () => {
    dispatch(setExtendDrawerDropdown(!isExtendDrawerDropdown));
  };

  useEffect(() => {
    if (currentUser) {
      !user && dispatch(getUserById({ id: currentUser?.userId?.id || "" }));
    }
  }, [currentUser]);
  const { user: userPlace } = place || {};
  const avatar = user
    ? user?.urlAvt?.small || user?.urlAvt?.default || SkeletonAvatar
    : userPlace?.urlAvt?.small || userPlace?.urlAvt?.default || SkeletonAvatar;

  return (
    <div className={`user-info-wrapper relative ${className}`}>
      <button
        type="button"
        className="relative z-20 flex items-center w-full gap-1 p-1 bg-white hover:bg-tertiary text-primary hover:text-warring"
        onClick={handleExpandMenu}
      >
        <div className="flex-none w-2.5 h-2.5 overflow-hidden rounded-full ">
          <img
            className="block w-full h-full m-auto object-cover"
            alt="avatar"
            src={avatar}
          />
        </div>
        <p className="flex-auto text-sm font-medium text-left normal-case leading-none truncate">
          {user?.displayName || userPlace?.displayName}
        </p>
        <ArrowIcon
          direction={isExtendDrawerDropdown ? "DOWN" : "UP"}
          className="flex-none w-1 fill-current"
        />
      </button>
      <DropDownMenu
        className={`absolute left-0 w-full z-10 duration-300 ${
          isExtendDrawerDropdown
            ? "bottom-full opacity-100"
            : "bottom-0 opacity-0 -z-1"
        }`}
      />
    </div>
  );
};

export default UserInfo;
