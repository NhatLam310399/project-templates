import { IRootState } from "@redux/reducers";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

import { useRedirect } from "@common/hooks/useRedirect";
import { PATH } from "@routes";

import { ConsultContainer, Title, Container, Item } from "./styles";

interface ConsultProps {}

const skeletonDefault = "/img/skeleton/default.jpg";

const Consult: React.FC<ConsultProps> = () => {
  const { t } = useTranslation(["home"]);

  const redirect = useRedirect();
  const {
    allBlog: { results: listPost = [] },
  } = useSelector((state: IRootState) => state.blog);

  const handleClick = (slug: string) => {
    redirect(PATH.BLOG_DETAIL, { slug: slug });
  };
  return (
    <ConsultContainer className="container">
      <Title>{t("career-counseling")}</Title>
      <Container>
        {listPost?.map((item, index) => {
          return (
            <Item.Container
              key={index}
              onClick={() => handleClick(item?.slug)}
              className="group"
            >
              <Item.ImgWrapper>
                <Item.Img
                  loading="lazy"
                  width="350px"
                  height="200px"
                  alt={item?.name}
                  smallSrc={
                    item?.urlImage?.small ||
                    item?.urlImage?.default ||
                    skeletonDefault
                  }
                  largeSrc={
                    item?.urlImage?.medium ||
                    item?.urlImage?.default ||
                    skeletonDefault
                  }
                />
              </Item.ImgWrapper>
              <Item.Inner>
                <Item.TitleItem>{item?.name}</Item.TitleItem>
                <Item.Description>{item?.description}</Item.Description>
              </Item.Inner>
            </Item.Container>
          );
        })}
      </Container>
    </ConsultContainer>
  );
};

export default Consult;
// <ListPost />
