import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

import { useClickOutSide } from "@common/hooks/useClickOutSide";
import { PATH } from "@routes";
import { removeCurrentUser } from "@redux/actions/auth";
import { useRedirect } from "@common/hooks/useRedirect";
import useAuth from "@common/hooks/useAuth";

import {
  UserInfoContainer,
  UserButton,
  AvatarWrapper,
  Avatar,
  UserName,
  Icon,
  Slider,
} from "./styles";

interface IUserInfoProps {}

const skeletonAvatar = "/img/skeleton/avatar.jpg";

const UserInfo: React.FC<IUserInfoProps> = (props) => {
  const { t } = useTranslation(["common"]);
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { accountInfo } = useAuth();
  const userInfo = accountInfo?.userInfo || {};
  const { elementRef, isVisible, setElementVisible } = useClickOutSide(false);

  const handleLogout = () => {
    dispatch(removeCurrentUser());
    redirect(PATH.LOGIN);
  };

  // useEffect(() => {
  //   const bodyElement = document.querySelector("body");
  //   if (isVisible) {
  //     bodyElement.style.overflow = "hidden";
  //   } else {
  //     bodyElement.style.overflow = "auto";
  //   }
  // }, [isVisible]);

  const menuItems = [
    {
      icon: "common/menu/user",
      text: t("header.personal-information"),
      path: PATH.JOB_MANAGEMENT_PERSONAL_INFO,
    },
    {
      icon: "common/menu/request",
      text: t("header.request-evaluted"),
      path: PATH.JOB_MANAGEMENT_EVALUATED,
    },
    {
      icon: "common/menu/job",
      text: t("header.applied-job"),
      path: PATH.JOB_MANAGEMENT_MYJOB,
    },
    {
      icon: "common/menu/employer-review",
      text: t("header.employer-review"),
      path: PATH.JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE,
    },
    {
      icon: "common/menu/edit",
      text: t("header.change-password"),
      path: PATH.JOB_MANAGEMENT_CHANGE_PASSWORD,
    },
  ];

  const userName = userInfo?.displayName
    ? userInfo?.displayName
    : `User ${userInfo?.code}`;

  const userAvatar =
    userInfo?.urlAvt?.small || userInfo?.urlAvt?.default || skeletonAvatar;

  return (
    <>
      <UserInfoContainer ref={elementRef}>
        <UserButton onClick={() => setElementVisible(!isVisible)}>
          <AvatarWrapper>
            <Avatar
              src={userAvatar}
              alt={userInfo?.displayName}
              width={36}
              height={36}
            />
          </AvatarWrapper>
          <UserName>{userName}</UserName>
          <Icon
            active={isVisible}
            name="common/menu/arrow-down"
            width={24}
            height={24}
          />
        </UserButton>
      </UserInfoContainer>
      <Transition
        show={isVisible}
        as={Fragment}
        enter="transition duration-300 ease-out"
        enterFrom="transform translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition duration-300 ease-in"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-full"
      >
        <Slider.Container>
          <Slider.User>
            <Slider.Avatar width="45px" height="45px" src={userAvatar} />
            <Slider.InfoWrapper>
              <Slider.Name>{userName}</Slider.Name>
              <Slider.Email>{userInfo?.email}</Slider.Email>
            </Slider.InfoWrapper>
            <Slider.Icon
              onClick={() => setElementVisible(!isVisible)}
              name="common/menu/mobile-close"
              width={24}
              height={24}
            />
          </Slider.User>
          {menuItems.map((item, index) => (
            <Slider.Link routeName={item.path} key={`slider-item-${index}`}>
              <Slider.Icon name={item.icon} width={24} height={24} />
              {item.text}
            </Slider.Link>
          ))}
          <Slider.Logout onClick={handleLogout}>
            <Slider.Icon name="common/menu/logout" width={24} height={24} />
            {t("header.logout")}
          </Slider.Logout>
        </Slider.Container>
      </Transition>
    </>
  );
};

export default UserInfo;
