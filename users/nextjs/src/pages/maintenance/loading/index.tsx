import { Fragment } from "react";
import { NextPage } from "next";
import Maintain from "@containers/Maintain";
import Meta from "@components/Meta";
import { END } from "redux-saga";
import { wrapper } from "@redux/store";
import { useTranslation } from "next-i18next";
import { SSGContext } from "@common/typings";
import { getAllBasicAPIForPage } from "@layouts/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PATH } from "@routes";

const MaintainPage: NextPage = (props) => {
  const { t } = useTranslation(["maintain"]);
  return (
    <Fragment>
      <Meta title={t("title")} routeName={PATH.MAINTAIN} />
      <Maintain />
    </Fragment>
  );
};

export default MaintainPage;

export const getStaticProps = wrapper.getStaticProps(
  async (context: SSGContext) => {
    const {
      locale = "vi",
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
      revalidate: 3600 * 60,
    };
  },
);
