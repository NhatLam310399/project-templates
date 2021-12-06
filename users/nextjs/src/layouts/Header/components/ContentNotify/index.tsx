import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "@common/hooks/useAuth";
import { setOpenNotification } from "@redux/actions/common";
import { IRootState } from "@redux/reducers";
import { PATH } from "@routes";

import Notify from "./Notify";

import {
  ContentContainer,
  Header,
  Icon,
  CloseIcon,
  Title,
  Login,
  Empty,
  NotifyContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { INotification } from "@common/typings";

const Content: React.FC = () => {
  const { isAuth } = useAuth();
  const { t } = useTranslation(["common"]);
  const {
    notifications: { loading = true, getNotifyByUser: result = [] },
    notificationsSetting: {
      loading: loadingSetting = false,
      results: notifySetting = [],
    },
  } = useSelector((state: IRootState) => state.notify);
  const { isOpenNotification } = useSelector(
    (state: IRootState) => state.actions,
  );
  const dispatch = useDispatch();
  const [allNotify, setAllNotify] = useState<INotification[]>([]);

  useEffect(() => {
    if (notifySetting.length > 0 && result.length > 0) {
      const notifyList: INotification[] = [];
      notifySetting?.map((setting) => {
        const notify: INotification = {
          company: {
            name: t("header.admin"),
          },
          createdAt: setting.createdAt,
          name: setting.name,
          description: setting.description,
        };
        notifyList.push(notify);
      });
      setAllNotify((state) => [...result, ...notifyList]);
    } else if (result.length > 0 && notifySetting?.length === 0) {
      setAllNotify(result);
    } else {
      setAllNotify(notifySetting);
    }
  }, [result, notifySetting]);

  const handleClose = () => {
    dispatch(setOpenNotification(false));
  };
  const arrReverse = [...allNotify];
  arrReverse?.sort((value1, value2) => {
    const date1 = new Date(value1.createdAt) as any;
    const date2 = new Date(value2.createdAt) as any;
    return date2 - date1;
  });
  return (
    <ContentContainer
      className={`transform ${
        isOpenNotification ? `translate-x-0` : `translate-x-full`
      }`}
    >
      <Header>
        <Icon name="common/menu/bell-icon" width={80} height={80} />
        <Title>{t("header.career-notification")}</Title>
        <CloseIcon
          onClick={handleClose}
          name="common/close"
          width={24}
          height={24}
        />
      </Header>
      {isAuth ? (
        <NotifyContainer>
          {!loading && !loadingSetting && arrReverse?.length > 0 ? (
            arrReverse?.map((notify) => <Notify notification={notify} />)
          ) : (
            <Empty>{t("header.empty-notify")}</Empty>
          )}
        </NotifyContainer>
      ) : (
        <Login.Wrapper>
          <Login.Title>{t("header.login-notification")}</Login.Title>
          <Login.Button
            routeName={PATH.LOGIN}
            className="transform hover:scale-105"
          >
            {t("header.login")}
          </Login.Button>
        </Login.Wrapper>
      )}
    </ContentContainer>
  );
};

export default Content;
