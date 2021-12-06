import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { wrapper } from "@redux/store";

import { SSGContext } from "@common/typings";
import { PATH } from "@routes";

import CompanyResult from "@containers/CompanyResult";
import { FindCompanyAPICaller } from "@containers/CompanyResult/helper";
import Meta from "@components/Meta";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";

const CompanyResultPage: NextPage = (props) => {
  const { t } = useTranslation(["company"]);

  return (
    <Fragment>
      <Meta title={t("company-result")} routeName={PATH.COMPANY_RESULT} />
      <Main type="company">
        <CompanyResult />
      </Main>
    </Fragment>
  );
};

export default CompanyResultPage;

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale = "vi",
      store: { dispatch, sagaTask },
      params,
    } = context;

    getAllBasicAPIForPage(locale, dispatch);
    const apiCaller = new FindCompanyAPICaller({ dispatch });
    await apiCaller.getProvinces();
    dispatch(END);
    await sagaTask.toPromise();

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "company"])),
      },
    };
  },
);
