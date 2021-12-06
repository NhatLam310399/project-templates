import { removeUserCookies } from "@common/utils/auth";
import { useRedirect } from "@common/hooks/useRedirect";
import { removeCurrentUser } from "@redux/actions/auth";
import { PATH } from "@routes";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { EmployerButtonContainer } from "./styles";

interface IEmployerButtonProps {
  isEmployer?: boolean;
}

const EmployerButton: React.FC<IEmployerButtonProps> = (props) => {
  const { isEmployer = false } = props;
  const { t } = useTranslation(["common"]);
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const handleClick = () => {
    const href = isEmployer ? PATH.USER_HOME : PATH.EMPLOYER_HOME;
    removeUserCookies();
    dispatch(removeCurrentUser());
    redirect(href);
  };
  return (
    <EmployerButtonContainer onClick={handleClick} employer={isEmployer}>
      {isEmployer ? t("header.job-seeker") : t("header.employer")}
    </EmployerButtonContainer>
  );
};

export default EmployerButton;
