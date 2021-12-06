import React, { useMemo, useEffect } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useHistory } from "react-router-dom";
import { PATH } from "constants/routes";
import { actionRemoveCurrentUser } from "redux/actions/auth";
import SVG from "designs/SVG";
import { useDispatch, useSelector } from "react-redux";
import { IById, IRootState } from "common/formatTypes";
import { getLoggedInAdmin, removeUserCookies } from "common/utils/auth";
import { resetAction } from "redux/actions/common";
import { getProfile, removeProfile } from "redux/actions/profile";
import AvatarSkeleton from "assets/svg/common/avatar-skeleton.svg";
import Dialog from "pages/dashboard/Overview/components/Dialog";
interface IUserInfo {
    className?: string;
}

const UserInfo: React.FC<IUserInfo> = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { className = "" } = props;

    const { profile } = useSelector((state: IRootState) => state.profile);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const currentUser = getLoggedInAdmin();
    if (!currentUser) {
        history.push(PATH.ACCOUNT.LOGIN);
    }
    const profileId = currentUser?.userInfo?._id || "";

    const getProfileApi = () => {
        const payload: IById = { id: profileId };
        dispatch(getProfile(payload));
    };

    useEffect(() => {
        if (!profileId) return;
        if (!profile) {
            getProfileApi();
        }
    }, [profile, profileId]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            getProfileApi();
        }
    }, [actionSuccess]);

    const avatarImg =
        profile?.urlAvt?.small || profile?.urlAvt?.default || AvatarSkeleton;

    const HeaderBar: React.FC = () => {
        return (
            <div className="flex items-center gap-1 cursor-pointer header-bar">
                <div className="avatar w-2.5 h-2.5">
                    <img
                        src={avatarImg}
                        alt=""
                        className="block object-cover w-full h-full max-w-full rounded-full"
                    />
                </div>
                <div className="text-lg font-bold leading-none normal-case name">
                    {profile?.displayName || "KTV ADMIN APP"}
                </div>

                <SVG name="common/down-arrow" />
            </div>
        );
    };
    const onClickLogout = () => {
        removeUserCookies();
        dispatch(actionRemoveCurrentUser());
        dispatch(removeProfile());
        history.push(PATH.ACCOUNT.LOGIN);
    };
    return (
        <div className={`user-info-wrapper ${className}`}>
            <Menu
                menuButton={
                    <MenuButton className="block w-full">
                        <HeaderBar />
                    </MenuButton>
                }
                offsetY={5}
                offsetX={-50}
                arrow
            >
                <MenuItem
                    className="w-full p-2"
                    styles={{
                        active: {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <Dialog
                        editField={profile}
                        ButtonMenu={
                            <button className="flex items-center gap-1.5">
                                <SVG
                                    name="common/user"
                                    className="block object-cover w-2 "
                                />
                                <span className="text-lg font-normal leading-none font-sfpro whitespace-nowrap">
                                    Thông tin cá nhân
                                </span>
                            </button>
                        }
                    />
                </MenuItem>
                <MenuItem
                    className="w-full p-2"
                    onClick={onClickLogout}
                    styles={{
                        active: {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <div className="flex items-center gap-1.5 ">
                        <SVG
                            name="common/logout"
                            className="block object-cover w-2 "
                        />
                        <span className="text-lg font-normal leading-none font-sfpro whitespace-nowrap">
                            Đăng xuất
                        </span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserInfo;
