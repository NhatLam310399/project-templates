import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SSGContext } from "@common/typings";
import { wrapper } from "@redux/store";
import { getAllBasicAPIForPage } from "@layouts/Main";
import Meta from "@components/Meta";
import NotFound from "@containers/NotFound";
import { PATH } from "@routes";

const NotFoundPage: NextPage = (props) => {
  const { t } = useTranslation(["notfound"]);
  return (
    <Fragment>
      <Meta title={t("notfound")} routeName={PATH.NOT_FOUND} />
      <NotFound />
    </Fragment>
  );
};

export default NotFoundPage;

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale,
      store: { dispatch, sagaTask },
    } = context;
    getAllBasicAPIForPage(locale, dispatch);
    dispatch(END);
    await sagaTask.toPromise();
    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["notfound"])),
      },
      revalidate: 3600,
    };
  },
);
