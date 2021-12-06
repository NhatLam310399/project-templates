import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { IRootState } from "@redux/reducers";
import { PATH } from "@routes";
import { setExtendEmployerDrawer } from "@redux/actions/common";

import {
  EmployerInfoContainer,
  Button,
  UserButton,
  AvatarWrapper,
  Avatar,
  UserName,
} from "./styles";

interface IEmployerInfoProps {}

const skeletonAvatar = "/img/skeleton/avatar.jpg";

const EmployerInfo: React.FC<IEmployerInfoProps> = (props) => {
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const userInfo = currentUser?.userInfo || {};
  const { isExtendEmployerDrawer } = useSelector(
    (state: IRootState) => state.actions,
  );

  const handleClick = () => {
    dispatch(setExtendEmployerDrawer(!isExtendEmployerDrawer));
  };

  return (
    <EmployerInfoContainer>
      <Button routeName={PATH.MAINTAIN} fullFill>
        {t("header.post-recruitment-news")}
      </Button>
      <Button routeName={PATH.MAINTAIN} outline>
        {t("header.find-candidate")}
      </Button>
      <UserButton onClick={handleClick}>
        <AvatarWrapper>
          <Avatar
            src={
              userInfo?.urlAvt?.small ||
              userInfo?.urlAvt?.default ||
              skeletonAvatar
            }
            alt={userInfo?.displayName}
            width={36}
            height={36}
          />
        </AvatarWrapper>
        <UserName>{userInfo?.displayName}</UserName>
      </UserButton>
    </EmployerInfoContainer>
  );
};

export default EmployerInfo;
