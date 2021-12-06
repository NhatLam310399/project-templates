import { Fragment, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import _Link from "next/link";
import { isEmpty } from "lodash";

import { getUserCookies } from "@common/utils/auth";

import { PATH } from "@routes";
import { IRootState } from "@redux/reducers";
import { getCurrentUser } from "@redux/actions/auth";

import UserInfo from "./components/UserInfo";
import Hamburger from "./components/Hamburger";
import Notification from "./components/Notification";
import ContentNotify from "./components/ContentNotify";
import {
  HeaderWrapper,
  HeaderContainer,
  LogoLink,
  Text,
  Logo,
  NavigationWrapper,
  PageNavigation,
  AuthenNavigation,
  Link,
  Button,
  Mobile,
  NotifyContainer,
  GroupInfo,
} from "./styles";
import {
  getNotificationsByUser,
  getNotificationsSetting,
} from "@redux/actions/notification";
import useAuth from "@common/hooks/useAuth";

interface IHeaderProps {
  type?: "job" | "company";
}

const Header = (props: IHeaderProps) => {
  const { type = "" } = props;

  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();

  const { contentWebsite } = useSelector(
    (state: IRootState) => state.contentWebsite,
  );

  const { currentUser } = useSelector((state: IRootState) => state.auth);

  const { isAuth } = useAuth();

  const { whiteLogo } = contentWebsite || {};
  useEffect(() => {
    if (isEmpty(currentUser) && currentUser?.userInfo?.email !== null) {
      dispatch(getCurrentUser(getUserCookies()));
    } else {
      dispatch(getNotificationsByUser({ userId: currentUser?.userInfo?._id }));
      dispatch(
        getNotificationsSetting({
          filterNotifySetting: { permission: "CANDIDATE" },
        }),
      );
    }
  }, [currentUser]);

  return (
    <>
      <HeaderWrapper className="wrapper">
        <HeaderContainer className="container">
          <LogoLink routeName={PATH.HOME}>
            <Logo src={whiteLogo?.default} />
          </LogoLink>
          {/*
           * Desktop navigation
           */}
          <NavigationWrapper>
            <PageNavigation>
              <Fragment>
                <Link highlight={type === "job"} routeName={PATH.JOB}>
                  {t("header.job")}
                </Link>
                <Link highlight={type === "company"} routeName={PATH.COMPANY}>
                  {t("header.company")}
                </Link>
              </Fragment>
            </PageNavigation>
            {isAuth ? (
              <GroupInfo>
                <NotifyContainer hasBorderLeft={false}>
                  <Notification />
                </NotifyContainer>
                <UserInfo />
              </GroupInfo>
            ) : (
              <AuthenNavigation>
                <_Link href="https://employer.tuyendungvn.com/">
                  <Text>{t("header.employer")}</Text>
                </_Link>
                <NotifyContainer hasBorderLeft={true}>
                  <Notification />
                </NotifyContainer>
                <Button fullFill routeName={PATH.LOGIN}>
                  {t("header.login")}
                </Button>
              </AuthenNavigation>
            )}
          </NavigationWrapper>

          {/*
           * Mobile navigation
           */}
          <Mobile.NavigationWrapper>
            <Hamburger />
          </Mobile.NavigationWrapper>
        </HeaderContainer>
      </HeaderWrapper>
      <ContentNotify />
    </>
  );
};
export default Header;
