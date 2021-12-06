import { Wrapper, Title, ListPost, Post } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@redux/reducers";
import { PATH } from "@routes";
import { useTranslation } from "next-i18next";
import { getAllBlog } from "@redux/actions/blog";
import { useEffect } from "react";
import ResponsiveImage from "@designs/ResponsiveImage";
import { IGetAllBlog } from "@common/typings";

interface IPostSide {}

const skeletonDefault = "/img/skeleton/default.jpg";

const PostSide: React.FC<IPostSide> = (props) => {
  const { t } = useTranslation(["home"]);
  const { blog = {} } = useSelector((state: IRootState) => state.blog);
  const dispatch = useDispatch();
  const {
    allBlog: { results: listPost },
  } = useSelector((state: IRootState) => state.blog);

  useEffect(() => {
    getAllBlogAPI();
  }, [blog]);
  const getAllBlogAPI = () => {
    const payload: IGetAllBlog = {
      filterCareerCounseling: {
        highlight: true,
        target: "CANDIDATE",
      },
      page: 0,
      size: 3,
    };
    dispatch(getAllBlog(payload));
  };

  return (
    <Wrapper>
      <Title>{t("blog.read-more")}</Title>
      <ListPost>
        {listPost.map((post, index) => {
          return (
            <Post.Container
              key={index}
              routeName={PATH.BLOG_DETAIL}
              params={{ slug: post?.slug }}
              className="group"
            >
              <ResponsiveImage
                width="350px"
                height="200px"
                alt={post?.name}
                largeSrc={
                  post?.urlImage?.medium ||
                  post?.urlImage?.default ||
                  skeletonDefault
                }
                smallSrc={
                  post?.urlImage?.small ||
                  post?.urlImage?.default ||
                  skeletonDefault
                }
                className="h-20 w-full rounded-lg object-cover"
              />
              <Post.Title className="paragraph-with-2-line">
                {post?.name}
              </Post.Title>
              <Post.TxtContent>{post?.description}</Post.TxtContent>
            </Post.Container>
          );
        })}
      </ListPost>
    </Wrapper>
  );
};

export default PostSide;
