import Search from "@components/SearchCompany";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardLayout from "./components/CardLayout";
import { CompanyContainer, Wrapper } from "./styles";
import { IRootState } from "@common/typings";

interface CompanyProps {}

const Company: React.FC<CompanyProps> = () => {
  const { t } = useTranslation(["company"]);

  const {
    mostViewCompanies: { results: mostViewCompanies },
  } = useSelector((state: IRootState) => state.company);
  const {
    newestCompanies: { results: newestCompanies },
  } = useSelector((state: IRootState) => state.company);
  const {
    mostAppliedCompanies: { results: mostAppliedCompanies },
  } = useSelector((state: IRootState) => state.company);
  const {
    mostRecruitingCompanies: { results: mostRecruitingCompanies },
  } = useSelector((state: IRootState) => state.company);

  return (
    <Wrapper>
      <Search />
      <CompanyContainer className="container">
        <CardLayout data={mostRecruitingCompanies} title={t("recruiting")} />
        <CardLayout data={mostViewCompanies} title={t("top-view")} />
        <CardLayout data={mostAppliedCompanies} title={t("top-applied")} />
        <CardLayout data={newestCompanies} title={t("newest")} />
      </CompanyContainer>
    </Wrapper>
  );
};

export default Company;
