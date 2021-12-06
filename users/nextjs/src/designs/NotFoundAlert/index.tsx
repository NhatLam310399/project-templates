import { SVG } from "@designs/SVG";
import { useTranslation } from "react-i18next";
import { NotFoundAlertContainer, NotFoundAlertTitle } from "./styles";

interface INotFoundAlertProps {
  isCompany?: boolean;
}

const NotFoundAlert: React.FC<INotFoundAlertProps> = ({ isCompany }) => {
  const { t } = useTranslation(["common"]);
  return (
    <NotFoundAlertContainer>
      <SVG name="common/no-data" width="148" height="148" />
      <NotFoundAlertTitle>
        {isCompany
          ? t("alert-not-found-company-title")
          : t("alert-not-found-title")}
      </NotFoundAlertTitle>
    </NotFoundAlertContainer>
  );
};

export default NotFoundAlert;
