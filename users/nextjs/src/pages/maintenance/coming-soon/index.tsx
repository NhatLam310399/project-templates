import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSGContext } from "@common/typings";
import { wrapper } from "@redux/store";
import { getAllBasicAPIForPage } from "@layouts/Main";
import Meta from "@components/Meta";
import CommingSoon from "@containers/CommingSoon";
import { PATH } from "@routes";

const ComingSoonPage: NextPage = (props) => {
  const { t } = useTranslation(["maintain"]);
  return (
    <Fragment>
      <Meta title={t("coming-soon")} routeName={PATH.COMING_SOON} />
      <CommingSoon />
    </Fragment>
  );
};

export default ComingSoonPage;

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
        ...(await serverSideTranslations(locale, ["maintain"])),
      },
      revalidate: 3600,
    };
  },
);
