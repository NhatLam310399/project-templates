import { Fragment } from "react";
import { END } from "redux-saga";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SSGContext } from "@common/typings";
import Meta from "@components/Meta";
import ForgotPassword from "@containers/ForgotPassword";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import Authen from "@layouts/Authen";
import { wrapper } from "@redux/store";
import { PATH } from "@routes";

const ForgotPasswordPage: NextPage = (props) => {
  const { t } = useTranslation(["authen"]);
  return (
    <Fragment>
      <Meta
        title={t("forgot-password.page-title")}
        routeName={PATH.FORGOT_PASSWORD}
      />
      <Main>
        <Authen>
          <ForgotPassword />
        </Authen>
      </Main>
    </Fragment>
  );
};

export default ForgotPasswordPage;

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
        ...(await serverSideTranslations(locale, ["common", "authen"])),
      },
      revalidate: 3600,
    };
  },
);
