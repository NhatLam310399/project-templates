import { useClickOutSide } from "@common/hooks/useClickOutSide";
import { IAccount } from "@common/typings";
import { PATH } from "@routes";
import { useTranslation } from "next-i18next";
import {
  UserInfoContainer,
  Container,
  UserInfoWrapper,
  Avatar,
  UserName,
  Icon,
  Dropdown,
  DropdownItem,
  Link,
} from "./styles";

interface IUserInfoProps {
  currentUser: IAccount;
}

const skeletonAvatar = "/img/skeleton/avatar.jpg";

const UserInfo: React.FC<IUserInfoProps> = ({ currentUser }) => {
  const { t } = useTranslation(["common"]);

  const userInfo = currentUser?.userInfo || {};

  const { elementRef, isVisible, setElementVisible } = useClickOutSide(false);

  return (
    <UserInfoContainer>
      <Container
        extend={isVisible}
        ref={elementRef}
        onClick={() => setElementVisible(!isVisible)}
      >
        <UserInfoWrapper>
          <Avatar
            src={
              userInfo?.urlAvt?.small ||
              userInfo?.urlAvt?.default ||
              skeletonAvatar
            }
            alt={userInfo?.displayName}
          />
          <UserName>{userInfo?.displayName || "username"}</UserName>
        </UserInfoWrapper>
        <Icon name="common/arrow-down" width={24} height={24} />
      </Container>
      <Dropdown extend={isVisible}>
        <DropdownItem>
          <Link routeName={PATH.JOB_MANAGEMENT_PERSONAL_INFO}>
            {t("header.personal-information")}
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link routeName={PATH.JOB_MANAGEMENT_EVALUATED}>
            {t("header.request-evaluted")}
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link routeName={PATH.JOB_MANAGEMENT_MYJOB}>
            {t("header.applied-job")}
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link routeName={PATH.JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE}>
            {t("header.employer-review")}
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link routeName={PATH.JOB_MANAGEMENT_CHANGE_PASSWORD}>
            {t("header.change-password")}
          </Link>
        </DropdownItem>
      </Dropdown>
    </UserInfoContainer>
  );
};

export default UserInfo;
