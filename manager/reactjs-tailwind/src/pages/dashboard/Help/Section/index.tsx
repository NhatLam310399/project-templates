import { useState } from "react";
import { useRouteMatch, useHistory } from "react-router";

import Notfound from "../Notfound";
import { Wrapper, Container } from "designs/PageLayout";
import Breadcrumb from "components/Breadcrumb";
import { Body, Title, Heading, Desc, SectionContainer } from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { IRootState, IArticle } from "typings";

import { addLink } from "redux/actions/help";
import { PATH } from "common/constants/routes";

interface ISectionProps {}

const Section: React.FC<ISectionProps> = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [route] = useState<any>(useRouteMatch());
  const linkPrev = useSelector((state: IRootState) => state.help.linkPrev);

  const listHelpCenterLevel1 = useSelector(
    (state: IRootState) => state.help.listHelpCenterLevel1,
  );
  const listArticle = useSelector(
    (state: IRootState) => state.help.listArticle,
  );

  let listArticleTemp = listArticle.filter((value, index) => {
    return value.helpCenterLevel2?._id === route.params.id;
  });

  const onHanleClickArticle = (value: IArticle) => {
    history.push(PATH.HELP_CENTER_ARTICAL.replace(":id", `${value._id}`));
    dispatch(
      addLink([
        {
          title: listHelpCenterLevel1.filter(values => {
            return values._id === value.helpCenterLevel2.helpCenterLevel1._id;
          })[0].nameCategoryLevel1,
          link: PATH.HELP_CENTER_DETAIL.replace(
            ":id",
            value.helpCenterLevel2.helpCenterLevel1._id,
          ),
        },
        {
          title: value.helpCenterLevel2.nameCategoryLevel2,
          link: PATH.HELP_CENTER_SECTION.replace(
            ":id",
            value.helpCenterLevel2._id,
          ),
        },
      ]),
    );
  };
  return listArticleTemp.length === 0 ? (
    <Notfound />
  ) : (
    <Wrapper>
      <Container>
        <SectionContainer>
          <Breadcrumb
            items={[
              {
                name: "Kingify Help Center",
                link: PATH.HELP_CENTER,
              },
              {
                name: linkPrev[0]?.title || " ",
                link: linkPrev[0]?.link || "",
              },
              {
                name:
                  listArticleTemp.length > 0
                    ? listArticleTemp[0].helpCenterLevel2.nameCategoryLevel2
                    : "",
              },
            ]}
          />
          <Heading>
            <Title>
              {listArticleTemp.length > 0
                ? listArticleTemp[0].helpCenterLevel2.nameCategoryLevel2
                : ""}
            </Title>
          </Heading>
          <Body>
            {listArticleTemp.map((value, index) => {
              return (
                <Desc onClick={e => onHanleClickArticle(value)} key={index}>
                  {value.title}
                </Desc>
              );
            })}
          </Body>
        </SectionContainer>
      </Container>
    </Wrapper>
  );
};

export default Section;
