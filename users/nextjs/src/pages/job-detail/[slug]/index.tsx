import { Fragment } from "react";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { wrapper } from "@redux/store";
import { NextPage } from "next";
import { LocalBusinessJsonLd, NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IRootState, SSRContext } from "@common/typings";
import { removeHtmlTagFromString } from "@common/functions/filter";
import { withRecord } from "@common/HOC/withRecord";
import { renderPrice } from "@common/functions";
import { ROOT_URL } from "@constants/app";
import { PATH } from "@routes";

import { getRecruitmentBySlug } from "@redux/actions/recruitment";

import JobDetail from "@containers/JobDetail";
import Meta from "@components/Meta";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";

const JobDetailPage: NextPage = (props) => {
  const { recruitmentDetail } = useSelector(
    (state: IRootState) => state.recruitment,
  );
  const {
    name,
    companyImages = [],
    description,
    salaryMin,
    slug,
    companyLocation,
  } = recruitmentDetail;
  const {
    seoData: { seoTitle },
  } = useSelector((state: IRootState) => state.contentWebsite);

  const seoDescription =
    removeHtmlTagFromString(description).slice(0, 157) + "...";

  const url = `${ROOT_URL}/viec-lam/${slug}`;

  const renderImages = () => {
    const otherImagesInfo = companyImages.map((item) => ({
      url: item?.small,
      width: 500,
      height: 346,
      alt: `${name} | ${seoTitle}`,
    }));

    return otherImagesInfo || [];
  };
  return (
    <Fragment>
      <Meta
        title={name}
        routeName={PATH.JOB_DETAIL}
        description={seoDescription}
      />
      <NextSeo
        openGraph={{
          images: renderImages(),
        }}
      />
      <LocalBusinessJsonLd
        type="job"
        name={name}
        description={seoDescription}
        id={url}
        url={url}
        priceRange={renderPrice(salaryMin)}
        address={{
          streetAddress: companyLocation,
          addressLocality: companyLocation,
          addressCountry: "VN",
          addressRegion: "vi",
          postalCode: "",
        }}
        images={renderImages()?.map(({ url }) => url)}
      />
      <Main>
        <JobDetail />
      </Main>
    </Fragment>
  );
};

export default withRecord(JobDetailPage);

export const getServerSideProps = wrapper.getServerSideProps(
  async (context: SSRContext) => {
    const {
      locale,
      params,
      res,
      store: { dispatch, sagaTask, getState },
    } = context;
    getAllBasicAPIForPage(locale, dispatch);
    const { slug = "" } = params;

    getAllBasicAPIForPage(locale, dispatch);
    dispatch(getRecruitmentBySlug({ slug: String(slug) }));

    dispatch(END);

    await sagaTask.toPromise();

    const {
      recruitment: { recruitmentDetail },
    } = getState() as IRootState;

    if (!Object.keys(recruitmentDetail).length) {
      res.statusCode = 404;
      return {
        notFound: true,
        props: {},
      };
    }

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "job"])),
      },
    };
  },
);
