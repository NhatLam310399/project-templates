import { Fragment } from "react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { END } from "redux-saga";

import { wrapper } from "@redux/store";
import Main, { getAllBasicAPIForPage } from "@layouts/Main";
import Register from "@containers/Register";
import { SSGContext } from "@common/typings";
import Meta from "@components/Meta";
import { PATH } from "@routes";
import Authen from "@layouts/Authen";

const RegisterPage: NextPage = () => {
  const { t } = useTranslation(["authen"]);
  return (
    <Fragment>
      <Meta title={t("register.page-title")} routeName={PATH.REGISTER} />
      <Main>
        <Authen>
          <Register />
        </Authen>
      </Main>
    </Fragment>
  );
};

export default RegisterPage;
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
