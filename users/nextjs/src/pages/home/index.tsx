import { Fragment } from "react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { END } from "redux-saga";

import { wrapper } from "@redux/store";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import Home from "@containers/Home";
import Meta from "@components/Meta";
import { SSGContext } from "@common/typings";
import { getAllMostKeyword } from "@redux/actions/recruitment";
import { PATH } from "@routes";

import {
  getBestRecruitment,
  getAllRecruitment,
} from "@redux/actions/recruitment";
import { getAllCompany } from "@redux/actions/company";
import { getAdsByLocation } from "@redux/actions/ads";
import { ADS_LOCATION } from "@constants/ads";
import { getAllBlogAPI } from "@containers/Home/helper";
const HomePage: NextPage = () => {
  const { t } = useTranslation(["home"]);
  return (
    <Fragment>
      <Meta title="" routeName={PATH.HOME} />
      <Main>
        <Home />
      </Main>
    </Fragment>
  );
};
export default HomePage;

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale,
      store: { dispatch, sagaTask },
    } = context;
    getAllBasicAPIForPage(locale, dispatch);
    dispatch(getAllMostKeyword());
    dispatch(
      getBestRecruitment({
        page: 0,
        size: 20,
      }),
    );
    dispatch(getAllBlogAPI());
    dispatch(
      getAllRecruitment({
        filterRecruitment: {
          sortType: "latest",
        },
        page: 0,
        size: 20,
      }),
    );

    dispatch(
      getAdsByLocation({
        displayLocation: ADS_LOCATION.CENTER_TOP_OF_HOME,
      }),
    );

    dispatch(
      getAllCompany({
        filterCompany: {
          highlight: true,
        },
      }),
    );

    dispatch(END);
    await sagaTask.toPromise();

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "home"])),
      },
      revalidate: 60,
    };
  },
);
