import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import TabLayout from "@layouts/TabJob";
import { PATH } from "@routes";
import { SSGContext } from "@common/typings";
import { withAuth } from "@common/HOC/withAuth";
import { wrapper } from "@redux/store";
import { getAllMostKeyword } from "@redux/actions/recruitment";
import Meta from "@components/Meta";
import ChangePassword from "@containers/JobSeeker/change-password";
import { FindCompanyAPICaller } from "@containers/CompanyResult/helper";

const Page: NextPage = (props) => {
  const { t } = useTranslation(["common"]);
  return (
    <Fragment>
      <Meta
        title={t("header.change-password")}
        routeName={PATH.JOB_MANAGEMENT_CHANGE_PASSWORD}
      />
      <Main>
        <TabLayout active={"CHANGE_PASSWORD"}>
          <ChangePassword />
        </TabLayout>
      </Main>
    </Fragment>
  );
};

export default withAuth(Page);

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale = "vi",
      store: { dispatch, sagaTask },
    } = context;
    const apiCaller = new FindCompanyAPICaller({ dispatch });
    await apiCaller.getProvinces();
    getAllBasicAPIForPage(locale, dispatch);
    dispatch(getAllMostKeyword());
    dispatch(END);
    await sagaTask.toPromise();

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale)),
      },
      revalidate: 3600,
    };
  },
);
