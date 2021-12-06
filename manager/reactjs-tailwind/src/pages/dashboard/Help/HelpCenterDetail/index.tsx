import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Body, Title, Heading, Desc } from "./styles";
import Notfound from "../Notfound";
import Items from "./Items";
import { Wrapper, Container } from "designs/PageLayout";
import Breadcrumb from "components/Breadcrumb";

import { PATH } from "common/constants/routes";
import {
  IGetArticle,
  IGetHelpCenterLevel2,
  IRootState,
  IArticle,
} from "typings";

import {
  addLink,
  getAllArticle,
  getAllHelpCenterLevel2,
} from "redux/actions/help";

interface ICategoryProps {}

const Detail: React.FC<ICategoryProps> = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [route] = useState<any>(useRouteMatch());

  const listHelpCenterLevel1 = useSelector(
    (state: IRootState) => state.help.listHelpCenterLevel1,
  );
  const linkPrev = useSelector((state: IRootState) => state.help.linkPrev);
  const listHelpCenterLevel2 = useSelector(
    (state: IRootState) => state.help.listHelpCenterLevel2,
  );

  console.log(route);
  useEffect(() => {
    if (listHelpCenterLevel1.length > 0) {
      dispatch(
        getAllHelpCenterLevel2<IGetHelpCenterLevel2>({
          page: 0,
          filterHelpCenterLevel2: {
            helpCenterLevel1: route.params.id,
          },
        }),
      );
      dispatch(
        getAllArticle<IGetArticle>({
          page: 0,
        }),
      );
    }
  }, []);

  const onHandleClickArticle = (value: IArticle) => {
    console.log(value.helpCenterLevel2);
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

  return listHelpCenterLevel2.length === 0 ? (
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
              name: linkPrev[0]?.title || " ",
            },
          ]}
        />
        <Heading>
          <Title>{linkPrev[0]?.title}</Title>
          {route.params.id === "getting-started" ? (
            <Desc>
              Find answers to all your questions about setting up your account
              and getting started with Printful.
            </Desc>
          ) : null}
        </Heading>
        <Body>
          {listHelpCenterLevel2.map((value, index) => {
            return (
              <Items helpCenterLevel2={value} onClick={onHandleClickArticle} />
            );
          })}
        </Body>
      </Container>
    </Wrapper>
  );
};

export default Detail;
