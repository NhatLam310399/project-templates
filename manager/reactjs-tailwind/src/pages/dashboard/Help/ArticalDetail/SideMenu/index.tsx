import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IArticle, IRootState } from "typings";
import { SideMenuContainer, Title, Orther } from "./styles";
import { PATH } from "common/constants/routes";
import { addLink } from "redux/actions/help";
interface ISideMenuProps {
  currentArticle: IArticle;
  listArticle: IArticle[];
  onClick: (helpCenter: IArticle) => void;
}

const TOTAL_RECORD = 10;
const SideMenu: React.FC<ISideMenuProps> = ({
  currentArticle,
  listArticle,
  onClick,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const listHelpCenterLevel1 = useSelector(
    (state: IRootState) => state.help.listHelpCenterLevel1,
  );

  const onHadleSeeMore = (value: IArticle) => {
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
      ]),
    );
    history.push(
      PATH.HELP_CENTER_DETAIL.replace(
        ":id",
        `${value.helpCenterLevel2.helpCenterLevel1._id}`,
      ),
    );
  };
  const onHandleClick = (value: IArticle) => {
    onClick(value);
  };

  let listArticleFilter = listArticle.filter(value => {
    return value.helpCenterLevel2?._id === currentArticle.helpCenterLevel2._id;
  });
  const renderElment = (listArticleFilter: IArticle[]) => {
    let listArticleTemp =
      listArticleFilter.length > 10
        ? [...listArticleFilter.slice(0, TOTAL_RECORD)]
        : [...listArticleFilter];
    return listArticleTemp.map((value, index) => {
      return (
        <Title
          active={value._id === currentArticle._id ? true : false}
          key={index}
          onClick={e => onHandleClick(value)}
        >
          {value.title}
        </Title>
      );
    });
  };
  return (
    <SideMenuContainer>
      {renderElment(listArticleFilter)}
      {listArticleFilter.length > 10 ? (
        <Orther onClick={e => onHadleSeeMore(currentArticle)}>See more</Orther>
      ) : null}
    </SideMenuContainer>
  );
};

export default SideMenu;
