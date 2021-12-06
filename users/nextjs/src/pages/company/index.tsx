import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { wrapper } from "@redux/store";
import {
  getMostAppliedCompany,
  getMostRecruitingCompany,
  getMostViewCompany,
  getNewestCompany,
  updateCompanyProvince,
} from "@redux/actions/company";
import { PATH } from "@routes";
import { SSGContext } from "@common/typings";
import { withRecord } from "@common/HOC/withRecord";
import Company from "@containers/Company";
import Meta from "@components/Meta";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import { FindCompanyAPICaller } from "@containers/CompanyResult/helper";

const CompanyPage: NextPage = (props) => {
  const { t } = useTranslation(["company"]);

  return (
    <Fragment>
      <Meta title={t("company-title")} routeName={PATH.COMPANY} />
      <Main type="company">
        <Company />
      </Main>
    </Fragment>
  );
};

export default withRecord(CompanyPage);

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale = "vi",
      store: { dispatch, sagaTask },
    } = context;

    getAllBasicAPIForPage(locale, dispatch);
    dispatch(updateCompanyProvince());
    dispatch(
      getMostRecruitingCompany({
        filterCompany: {
          isRecruiting: true,
        },
        size: 20,
      }),
    );
    dispatch(
      getNewestCompany({
        filterCompany: {
          sortType: "latest",
        },
        size: 20,
      }),
    );
    dispatch(
      getMostViewCompany({
        filterCompany: {
          sortType: "mostView",
        },
        size: 20,
      }),
    );
    dispatch(
      getMostAppliedCompany({
        filterCompany: {
          sortType: "mostApplied",
        },
        size: 20,
      }),
    );

    const apiCaller = new FindCompanyAPICaller({ dispatch });
    await apiCaller.getProvinces();

    dispatch(END);
    await sagaTask.toPromise();

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "company"])),
      },
      revalidate: 3600,
    };
  },
);
