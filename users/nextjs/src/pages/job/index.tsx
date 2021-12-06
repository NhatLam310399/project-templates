import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { wrapper } from "@redux/store";

import { IRootState } from "@redux/reducers";
import { withRecord } from "@common/HOC/withRecord";
import { IFindJobRoute, SSGContext } from "@common/typings";
import { PATH } from "@routes";

import Job from "@containers/Job";
import {
  AdsJobAPICaller,
  FindJobAPICaller,
  getAllCategoryLv2API,
} from "@containers/Job/helper";
import Meta from "@components/Meta";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import { getAllMostKeyword } from "@redux/actions/recruitment";
import { getAllCategoryLevel2 } from "@redux/actions/category";
import {
  getAllJobLevel,
  getAllJobType,
  getAllLevelPrice,
} from "@redux/actions/job";
import { getProvinces } from "@redux/actions/location";

const JobPage: NextPage = (props) => {
  const { t } = useTranslation(["job"]);
  const { query } = useRouter();

  const { categorySelected } = useSelector(
    (state: IRootState) => state.category,
  );
  const { provinceSelected } = useSelector(
    (state: IRootState) => state.location,
  );
  const { jobLevelSelected, levelPriceSelected, jobTypeSelected } = useSelector(
    (state: IRootState) => state.job,
  );

  const renderTitle = (): string => {
    let title: string = t("title.job");

    if (jobTypeSelected?.name !== undefined) {
      title += `${jobTypeSelected?.name?.toLowerCase()}`;
    }
    if (categorySelected?.name !== undefined) {
      const career = categorySelected?.name;
      title += t("title.career").replace("$career", career);
    }
    if (levelPriceSelected?.displayName !== undefined) {
      const price = levelPriceSelected?.displayName;
      title += t("title.with-price").replace("$price", price);
    }
    if (jobLevelSelected?.name !== undefined) {
      const level = jobLevelSelected?.name;
      title += t("title.for-level").replace("$level", level);
    }
    if (provinceSelected?.name !== undefined) {
      const province = provinceSelected?.name;
      title += t("title.location").replace("$location", province);
    }
    if (query.k) {
      let keyword = decodeURIComponent(String(query.k));
      if (keyword.length > 25) {
        keyword = keyword.slice(0, 25) + "...";
      }
      title += t("title.with-keyword").replace("$keyword", String(keyword));
    }

    return title;
  };

  const title = renderTitle();

  return (
    <Fragment>
      <Meta title={title} routeName={PATH.JOB} description={title} />
      <Main type="job">
        <Job />
      </Main>
    </Fragment>
  );
};

export default withRecord(JobPage);

export const getServerSideProps = wrapper.getServerSideProps(
  async (context: SSGContext) => {
    const {
      locale = "vi",
      store: { dispatch, sagaTask },
      params,
    } = context;

    dispatch(getAllCategoryLv2API(0));
    dispatch(getAllJobLevel());
    dispatch(getAllLevelPrice({}));
    dispatch(getAllJobType({}));

    const apiCaller = new FindJobAPICaller({
      dispatch,
    });

    await apiCaller.getProvinceAndSelect();
    await apiCaller.filterAllJobAPI();

    const apiCallerForAdsJob = new AdsJobAPICaller({ dispatch });
    await apiCallerForAdsJob.getAds1();
    await apiCallerForAdsJob.getAds2();
    await apiCallerForAdsJob.getAds3();
    await apiCallerForAdsJob.getAds4();
    await apiCallerForAdsJob.getAds5();

    dispatch(getAllMostKeyword());
    getAllBasicAPIForPage(locale, dispatch);
    dispatch(END);
    await sagaTask.toPromise();

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "job"])),
      },
    };
  },
);
