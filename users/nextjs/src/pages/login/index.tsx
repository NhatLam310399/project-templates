import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SSGContext } from "@common/typings";
import { wrapper } from "@redux/store";
import Login from "@containers/Login";
import Meta from "@components/Meta";
import { PATH } from "@routes";

import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import Authen from "@layouts/Authen";
import { useTranslation } from "next-i18next";

const LoginPage: NextPage = () => {
  const { t } = useTranslation(["authen"]);
  return (
    <Fragment>
      <Meta title={t("login.page-title")} routeName={PATH.LOGIN} />
      <Main>
        <Authen>
          <Login />
        </Authen>
      </Main>
    </Fragment>
  );
};

export default LoginPage;

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
        ...(await serverSideTranslations(locale, ["common", "authen"])),
      },
      revalidate: 60,
    };
  },
);
