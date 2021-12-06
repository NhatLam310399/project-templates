import { Fragment } from "react";
import { NextPage } from "next";
import { END } from "redux-saga";
import { wrapper } from "@redux/store";
import BlogDetail from "@containers/BlogDetail";
import Meta from "@components/Meta";
import Main from "@layouts/Main";
import { getAllBasicAPIForPage } from "@layouts/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getBlogBySlug } from "@redux/actions/blog";
import { IRootState, SSGContext } from "@common/typings";
import { useSelector } from "react-redux";
import { PATH } from "@routes";

const BlogDetailPage: NextPage = () => {
  const { blog = {} } = useSelector((state: IRootState) => state.blog);
  return (
    <Fragment>
      <Meta title={blog?.name} routeName={PATH.BLOG_DETAIL} />
      <Main noBackground={true}>
        <BlogDetail />
      </Main>
    </Fragment>
  );
};

export default BlogDetailPage;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context: SSGContext) => {
    const {
      locale,
      params,
      store: { dispatch, sagaTask },
    } = context;

    const { slug = "" } = params || {};

    dispatch(getBlogBySlug({ slug: String(slug) }));
    getAllBasicAPIForPage(locale, dispatch);

    dispatch(END);
    await sagaTask.toPromise();

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "home"])),
      },
    };
  },
);
