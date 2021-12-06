import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";

import Notfound from "../Notfound";
import { Body } from "./styles";
import SideMenu from "./SideMenu";
import Content from "./Content";
import { Wrapper, Container } from "designs/PageLayout";
import Breadcrumb from "components/Breadcrumb";

import { IRootState, IArticle } from "typings";
import { PATH } from "common/constants/routes";

interface IArticalProps {}

const Artical: React.FC<IArticalProps> = props => {
  const history = useHistory();
  const [route] = useState<any>(useRouteMatch());
  const [idArticle, setIdArticle] = useState<string>(() => route.params.id);
  const listArtile = useSelector((state: IRootState) => state.help.listArticle);
  const linkPrev = useSelector((state: IRootState) => state.help.linkPrev);

  const onHandleSideMenuClick = (value: IArticle) => {
    history.replace(PATH.HELP_CENTER_ARTICAL.replace(":id", `${value._id}`));
    setIdArticle(value._id);
  };

  const currentArticle = filterArticle(listArtile, idArticle);

  useEffect(() => {}, []);
  return !currentArticle ? (
    <Notfound />
  ) : (
    <Wrapper>
      <Container>
        <Breadcrumb
          items={[
            {
              name: "Kingify Help Center",
              link: PATH.HELP_CENTER,
            },
            {
              name: linkPrev.length > 0 ? linkPrev[0].title : "",
              link: linkPrev.length > 0 ? linkPrev[0].link : "",
            },
            {
              name: linkPrev.length > 0 ? linkPrev[1].title : "",
              link: linkPrev.length > 0 ? linkPrev[1].link : "",
            },
            {
              name: currentArticle.title,
            },
          ]}
        />
        <Body>
          <SideMenu
            listArticle={listArtile}
            currentArticle={currentArticle}
            onClick={onHandleSideMenuClick}
          />
          <Content currentArticle={currentArticle} />
        </Body>
      </Container>
    </Wrapper>
  );
};

const filterArticle = (listArticle: IArticle[] | null, _id: string) => {
  let article: IArticle | null = null;
  if (listArticle && listArticle.length > 0) {
    [article] = listArticle.filter(value => {
      return value._id === _id;
    });
  }
  return article;
};
export default Artical;
