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
import { ROOT_URL } from "@constants/app";
import { PATH } from "@routes";

import { getCompanyBySlug } from "@redux/actions/company";

import CompanyDetail from "@containers/CompanyDetail";
import Meta from "@components/Meta";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";

const CompanyDetailPage: NextPage = (props) => {
  const { companyDetail } = useSelector((state: IRootState) => state.company);
  const { name, images = [], description, slug, location } = companyDetail;
  const {
    seoData: { seoTitle },
  } = useSelector((state: IRootState) => state.contentWebsite);

  const seoDescription =
    removeHtmlTagFromString(description).slice(0, 157) + "...";

  const url = `${ROOT_URL}/thong-tin-cong-ty/${slug}`;

  const renderImages = () => {
    const otherImagesInfo = images.map((item) => ({
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
        routeName={PATH.COMPANY_DETAIL}
        description={seoDescription}
      />
      <NextSeo
        openGraph={{
          images: renderImages(),
        }}
      />
      <LocalBusinessJsonLd
        type="company"
        name={name}
        description={seoDescription}
        id={url}
        url={url}
        address={{
          streetAddress: location,
          addressLocality: location,
          addressCountry: "VN",
          addressRegion: "vi",
          postalCode: "",
        }}
        images={renderImages()?.map(({ url }) => url)}
      />
      <Main>
        <CompanyDetail />
      </Main>
    </Fragment>
  );
};

export default withRecord(CompanyDetailPage);

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
    dispatch(getCompanyBySlug({ slug: String(slug) }));

    dispatch(END);

    await sagaTask.toPromise();

    const {
      company: { companyDetail },
    } = getState() as IRootState;

    if (!Object.keys(companyDetail).length) {
      res.statusCode = 404;
      return {
        notFound: true,
        props: {},
      };
    }

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "company"])),
      },
    };
  },
);
