import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { IFindCompanyRoute, IGetCompanies, IRootState } from "@common/typings";

import { useRedirect } from "@common/hooks/useRedirect";
import { cleanObject, formatParams } from "@common/functions";
import { PATH } from "@routes";

import { getAllCompany } from "@redux/actions/company";

import Search from "@components/SearchCompany";
import Pagination from "@components/Pagination";
import ErrorBoundary from "@components/ErrorBoundary";
import NotFoundAlert from "@designs/NotFoundAlert";
import CompanyItem from "@designs/Card/CompanyItem";

import {
  CardWrapper,
  Container,
  CountNumber,
  ListCardContainer,
  ResultCount,
  Wrapper,
} from "./styles";

interface ICompanyResultProps {}

const SIZE_PER_PAGE = 12;

const CompanyResult: React.FC<ICompanyResultProps> = (props) => {
  const { t } = useTranslation(["company"]);
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const fullQuery: IFindCompanyRoute.FullQueries = useRouter().query;
  const { k: _keywords, p: _province, page = 1 } = fullQuery;

  const keywords = formatParams(decodeURIComponent(_keywords || ""));
  const province = formatParams(decodeURIComponent(_province || ""));

  const {
    allCompany: { results: allCompany = [], totalCount = 0, loading },
  } = useSelector((state: IRootState) => state.company);

  useEffect(() => {
    if (fullQuery) {
      getCompaniesAPI();
    }
  }, [fullQuery]);

  const getCompaniesAPI = () => {
    const payload: IGetCompanies = {
      keyword: keywords,
      filterCompany: {
        slugProvince: province,
      },
      page: Number(page) - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllCompany(cleanObject(payload)));
  };

  const handlePageChange = (newPage: number) => {
    redirect(PATH.JOB, fullQuery, {
      page: newPage + 1,
    } as IFindCompanyRoute.Queries);
  };

  return (
    <Wrapper>
      <Search />
      <Container className="container">
        <ResultCount>
          <CountNumber>{totalCount}</CountNumber> {t("found")}
        </ResultCount>
        <ErrorBoundary>
          {((!loading && !totalCount) || totalCount == 0) && (
            <NotFoundAlert isCompany />
          )}
          <ListCardContainer>
            {allCompany.map((company, index) => (
              <CardWrapper>
                <CompanyItem company={company} key={index} />
              </CardWrapper>
            ))}
          </ListCardContainer>
        </ErrorBoundary>

        {totalCount > 0 && (
          <Pagination
            page={Number(page) - 1}
            sizePerPage={SIZE_PER_PAGE}
            totalSize={totalCount}
            onPageChange={handlePageChange}
            className="mt-2"
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default CompanyResult;
