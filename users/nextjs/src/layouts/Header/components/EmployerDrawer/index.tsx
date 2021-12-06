import { IRootState } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import { PATH } from "@routes";
import { removeCurrentUser } from "@redux/actions/auth";
import { setExtendEmployerDrawer } from "@redux/actions/common";
import { useEffect } from "react";
import DrawerList from "./DrawerList";
import { useRedirect } from "@common/hooks/useRedirect";

import {
  EmployerDrawerContainer,
  UserInfo,
  AvatarWrapper,
  Avatar,
  InfoWrapper,
  UserName,
  Email,
  CloseButton,
  CloseIcon,
  Candidate,
  Icon,
  Logout,
} from "./styles";

interface IEmployerDrawerProps {}

const skeletonAvatar = "/img/skeleton/avatar.jpg";

const EmployerDrawer: React.FC<IEmployerDrawerProps> = (props) => {
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const redirect = useRedirect();
  const userInfo = currentUser?.userInfo || {};
  const { isExtendEmployerDrawer } = useSelector(
    (state: IRootState) => state.actions,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);

  const handleClick = () => {
    dispatch(setExtendEmployerDrawer(!isExtendEmployerDrawer));
  };

  const handleLogout = () => {
    dispatch(setExtendEmployerDrawer(!isExtendEmployerDrawer));
    dispatch(removeCurrentUser());
    redirect(PATH.EMPLOYER_LOGIN);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (isExtendEmployerDrawer) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isExtendEmployerDrawer]);

  const accountSettingItem = [
    {
      name: t("employer-drawer.account-information"),
      link: PATH.EMPLOYER_ACCOUNT_INFORMATION,
    },
    {
      name: t("employer-drawer.company-information"),
      link: PATH.MAINTAIN,
    },
    {
      name: t("employer-drawer.change-password"),
      link: PATH.EMPLOYER_WORK_LOCATION,
    },
  ];

  const recruitmentItem = [
    {
      name: t("employer-drawer.account-information"),
      link: PATH.MAINTAIN,
    },
    {
      name: t("employer-drawer.company-information"),
      link: PATH.MAINTAIN,
    },
    {
      name: t("employer-drawer.change-password"),
      link: PATH.MAINTAIN,
    },
  ];
  return (
    <EmployerDrawerContainer isOpen={isExtendEmployerDrawer}>
      <UserInfo>
        <AvatarWrapper>
          <Avatar
            src={
              userInfo?.urlAvt?.small ||
              userInfo?.urlAvt?.default ||
              skeletonAvatar
            }
          />
        </AvatarWrapper>
        <InfoWrapper>
          <UserName>{userInfo?.displayName}</UserName>
          <Email>{userInfo?.email}</Email>
        </InfoWrapper>
        <CloseButton onClick={handleClick}>
          <CloseIcon name="common/close" width={24} height={24} />
        </CloseButton>
      </UserInfo>
      <DrawerList
        title={t("employer-drawer.account-setting")}
        iconName="common/menu/user"
        items={accountSettingItem}
      />
      <DrawerList
        title={t("employer-drawer.recruitment")}
        iconName="common/menu/recruitment"
        items={recruitmentItem}
      />
      <Candidate routeName={PATH.MAINTAIN}>
        <Icon name="common/menu/candidate" width={24} height={24} />
        {t("employer-drawer.candidate")}
      </Candidate>
      <Logout onClick={handleLogout}>
        <Icon name="common/menu/logout" width={24} height={24} />
        {t("header.logout")}
      </Logout>
    </EmployerDrawerContainer>
  );
};

export default EmployerDrawer;
