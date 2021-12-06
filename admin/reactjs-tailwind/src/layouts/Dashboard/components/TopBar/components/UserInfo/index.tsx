import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useHistory } from "react-router-dom";

import { PATH } from "constants/routes";

import { getProfile, removeProfile } from "redux/actions/profile";
import { actionRemoveCurrentUser } from "redux/actions/auth";

import ProfileDialog from "components/UpdateUserProfileDialog";
import ArrowIcon from "designs/icons/Arrow";
import AvatarSkeleton from "assets/svg/user/user-icon.svg";

import { IById, IRootState } from "common/typings";
import { getLoggedInAccount, removeUserCookies } from "common/utils/auth";

interface IUserInfo {
  className?: string;
}

const UserInfo: React.FC<IUserInfo> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector((state: IRootState) => state.profile);
  const currentUser = getLoggedInAccount();
  if (!currentUser) {
    history.push(PATH.ACCOUNT.LOGIN);
  }
  const profileId = currentUser?.userInfo?._id || "";

  const getProfileApi = () => {
    const payload: IById = { id: profileId };
    dispatch(getProfile(payload));
  };

  useEffect(() => {
    if (profileId) {
      !profile && getProfileApi();
    }
  }, [profile, profileId]);

  const dropdownItems = useMemo(
    () => [
      {
        name: "Đăng xuất",
        onClick: () => {
          removeUserCookies();
          dispatch(actionRemoveCurrentUser());
          dispatch(removeProfile());
          history.push(PATH.ACCOUNT.LOGIN);
        },
      },
    ],
    [],
  );

  const avatarImg =
    profile?.urlAvt?.small || profile?.urlAvt?.default || AvatarSkeleton;

  const HeaderBar: React.FC = () => {
    return (
      <div className="flex flex-row w-full gap-2">
        <div className="overflow-hidden rounded-full avatar ">
          <img
            src={avatarImg}
            alt="avatar"
            className="block w-4 h-4 object-cover m-auto"
          />
        </div>
        <ArrowIcon direction="DOWN" className="fill-current text-white w-1" />
      </div>
    );
  };

  return (
    <>
      <h1 className="text-lg leading-none font-medium text-white">
        {profile?.displayName || "KTV ADMIN APP"}
      </h1>
      <div>
        <Menu
          menuButton={
            <MenuButton className="block">
              <HeaderBar />
            </MenuButton>
          }
          offsetY={5}
          align="end"
          arrow
          className="p-0 rounded-lg "
        >
          <MenuItem className="block w-full p-0">
            <ProfileDialog
              editField={profile}
              isEdit
              ButtonMenu={
                <div className="py-1.3 px-2 font-medium leading-none text-sm text-primary ">
                  Thông tin tài khoản
                </div>
              }
            />
          </MenuItem>
          {dropdownItems.map(({ name, onClick }) => (
            <MenuItem className="block w-full p-0" key={name}>
              <button
                type="button"
                className="py-1.3 px-2 block text-sm font-medium leading-none text-primary "
                onClick={onClick}
              >
                {name}
              </button>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};

export default UserInfo;
