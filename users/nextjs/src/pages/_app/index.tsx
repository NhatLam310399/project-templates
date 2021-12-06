// Lib import
import Head from "next/head";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { StyledToastContainer } from "@components/ToastNotification";

// Native import
import { ApolloProvider } from "@apollo/react-hooks";
import { wrapper } from "@redux/store";
import { useApollo } from "@common/utils/useApollo";

// SCSS local import
import "@common/styles/index.scss";

// CSS lib import
import "react-lazy-load-image-component/src/effects/blur.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopProgressBar = dynamic(
  () => {
    return import("@components/TopProgressBar");
  },
  { ssr: false },
);

const WebApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>

        <meta charSet="utf-8" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <StyledToastContainer />
        <TopProgressBar />
        <Component {...pageProps} auth={pageProps.auth} />
      </ApolloProvider>
    </>
  );
};

export default wrapper.withRedux(appWithTranslation(WebApp));
