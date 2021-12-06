import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { END } from "redux-saga";

import Meta from "@components/Meta";
import PersonalInfo from "@containers/JobSeeker/PersonalInfo";
import { FindCompanyAPICaller } from "@containers/CompanyResult/helper";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import TabLayout from "@layouts/TabJob";

import { SSGContext } from "@common/typings";
import { withAuth } from "@common/HOC/withAuth";
import { withRecord } from "@common/HOC/withRecord";
import { wrapper } from "@redux/store";
import { getAllMostKeyword } from "@redux/actions/recruitment";
import { PATH } from "@routes";

const PersonalInfoPage: NextPage = (props) => {
  const { t } = useTranslation(["common"]);

  return (
    <>
      <Meta
        title={t("header.personal-information")}
        routeName={PATH.JOB_MANAGEMENT_PERSONAL_INFO}
      />
      <Main>
        <TabLayout active={"PERSONAL_INFO"}>
          <PersonalInfo />
        </TabLayout>
      </Main>
    </>
  );
};

export default withAuth(PersonalInfoPage);

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale = "vi",
      store: { dispatch, sagaTask },
    } = context;
    getAllBasicAPIForPage(locale, dispatch);

    const apiCaller = new FindCompanyAPICaller({ dispatch });
    await apiCaller.getProvinces();
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
