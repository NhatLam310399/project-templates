import { PATH } from "@routes";
import { useTranslation } from "next-i18next";
import { NavMenuContainer, NavLink, Button } from "./styles";
interface INavMenuProps {
  employer?: boolean;
  type?: string;
}

const NavMenu: React.FC<INavMenuProps> = (props) => {
  const { employer = false, type = "" } = props;
  const { t } = useTranslation(["common"]);
  return (
    <NavMenuContainer employer={employer}>
      {employer ? (
        <>
          <NavLink routeName={PATH.ABOUT} active={type === "about" && true}>
            {t("header.about")}
          </NavLink>
          <NavLink routeName={PATH.CONTACT} active={type === "contact" && true}>
            {t("header.contact")}
          </NavLink>
        </>
      ) : (
        <>
          <NavLink routeName={PATH.JOB} active={type === "job" && true}>
            {t("header.job")}
          </NavLink>
          <NavLink routeName={PATH.COMPANY} active={type === "company" && true}>
            {t("header.company")}
          </NavLink>
          <NavLink routeName={PATH.EMPLOYER_RECRUITMENT}>
            <Button>Đăng tuyển dụng</Button>
          </NavLink>
        </>
      )}
    </NavMenuContainer>
  );
};
export default NavMenu;
