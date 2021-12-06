import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

import { setOpenNotification } from "@redux/actions/common";
import { removeCurrentUser } from "@redux/actions/auth";
import { IRootState } from "@redux/reducers";

import useAuth from "@common/hooks/useAuth";
import { useClickOutSide } from "@common/hooks/useClickOutSide";
import { useRedirect } from "@common/hooks/useRedirect";

import { PATH } from "@routes";

import UserInfo from "./components/UserInfo";
import { HamburgerContainer, Dropdown, Icon } from "./styles";
import Notification from "../Notification";

interface IHamburgerProps {
  className?: string;
}

const Hamburger: React.FC<IHamburgerProps> = (props) => {
  const { className = "" } = props;
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const { isOpenNotification } = useSelector(
    (state: IRootState) => state.actions,
  );
  const { isAuth, accountInfo } = useAuth();

  const { elementRef, isVisible, setElementVisible } = useClickOutSide(false);
  const listNotification = [];
  const notificationIcon =
    listNotification.length > 0 ? "haveNotify" : "noNotify";

  const handleClick = () => {
    dispatch(setOpenNotification(true));
    setElementVisible(false);
  };

  const handleLogout = () => {
    dispatch(removeCurrentUser());
    redirect(PATH.LOGIN);
  };
  return (
    <>
      <HamburgerContainer className={className} ref={elementRef}>
        <Icon
          onClick={() => setElementVisible(!isVisible)}
          name="common/menu/hamburger"
          height={24}
          width={24}
          className="w-3 phone:w-3.5 cursor-pointer"
        />
        <Transition
          show={isVisible}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform -translate-y-full"
          enterTo="transform translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform translate-y-0"
          leaveTo="transform -translate-y-full"
        >
          <Dropdown.Container>
            <Dropdown.CloseIcon
              onClick={() => setElementVisible(!isVisible)}
              name="common/menu/mobile-close"
              width={24}
              height={24}
            />
            {isAuth && <UserInfo currentUser={accountInfo} />}
            <Dropdown.Navigation>
              <Dropdown.Link routeName={PATH.JOB}>
                <Dropdown.Icon name="common/menu/job" width={24} height={24} />
                {t("header.job")}
              </Dropdown.Link>
              <Dropdown.Link routeName={PATH.COMPANY}>
                <Dropdown.Icon
                  name="common/menu/company"
                  width={24}
                  height={24}
                />
                {t("header.company")}
              </Dropdown.Link>
            </Dropdown.Navigation>
            <Dropdown.Notification onClick={handleClick}>
              <Notification />
              {t("header.notification")}
            </Dropdown.Notification>
            {!isAuth ? (
              <Dropdown.Authen>
                <Dropdown.Link routeName={PATH.LOGIN} secondary separate>
                  {t("header.login")}
                </Dropdown.Link>
                <Dropdown.Link routeName={PATH.REGISTER} secondary>
                  {t("header.register")}
                </Dropdown.Link>
              </Dropdown.Authen>
            ) : (
              <Dropdown.Logout onClick={handleLogout}>
                <Dropdown.Icon
                  name="common/menu/logout"
                  width={24}
                  height={24}
                />
                {t("header.logout")}
              </Dropdown.Logout>
            )}
            <Dropdown.ButtonWrapper>
              <Dropdown.Button
                href="https://www.employer.tuyendungvn.com/"
                target="_blank"
              >
                {t("header.employer-page")}
              </Dropdown.Button>
            </Dropdown.ButtonWrapper>
          </Dropdown.Container>
        </Transition>
      </HamburgerContainer>
    </>
  );
};

export default Hamburger;
