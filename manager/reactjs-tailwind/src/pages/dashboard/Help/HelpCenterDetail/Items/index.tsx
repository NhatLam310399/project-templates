import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Button from "designs/Button";
import { ItemsContainer, Title, Body } from "./styles";

import { IArticle, IHelpCenterLevel2, IRootState } from "typings";
import { addLink } from "redux/actions/help";
import { PATH } from "common/constants/routes";
interface IItemsProps {
  helpCenterLevel2: IHelpCenterLevel2;
  onClick: (value: IArticle) => void;
}

const TOTAL_RECORD = 6;

const Items: React.FC<IItemsProps> = ({ helpCenterLevel2, onClick }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const listArticle = useSelector(
    (state: IRootState) => state.help.listArticle,
  );
  const onHandleClick = (value: IArticle) => {
    onClick(value);
  };
  const onClickHandleAll = (value: IHelpCenterLevel2) => {
    dispatch(
      addLink([
        {
          title: value.helpCenterLevel1.nameCategoryLevel1,
          link: PATH.HELP_CENTER_DETAIL.replace(
            ":id",
            value.helpCenterLevel1._id,
          ),
        },
      ]),
    );
    history.push(PATH.HELP_CENTER_SECTION.replace(":id", helpCenterLevel2._id));
  };
  let filterArticle: IArticle[] = [];

  if (listArticle.length > 0) {
    filterArticle = listArticle.filter((value, index) => {
      return value.helpCenterLevel2?._id === helpCenterLevel2?._id;
    });
  }
  const renderElment = (listArtical: IArticle[]) => {
    let listArticalTemp =
      listArtical.length > TOTAL_RECORD
        ? [...listArtical.slice(0, TOTAL_RECORD)]
        : [...listArtical];

    console.log(listArticalTemp);
    return listArticalTemp.map((value, index) => {
      return (
        <Body.Desc key={index} onClick={e => onHandleClick(value)}>
          {value.title}
        </Body.Desc>
      );
    });
  };
  return (
    <ItemsContainer>
      <Title>{helpCenterLevel2.nameCategoryLevel2}</Title>
      <Body.Wrapper>
        {filterArticle.length > 0 ? (
          renderElment(filterArticle)
        ) : (
          <Body.Empty>Không có bài viết nào</Body.Empty>
        )}

        {filterArticle.length > TOTAL_RECORD ? (
          <Button
            onClick={e => onClickHandleAll(helpCenterLevel2)}
            className="mt-2"
          >
            See all {filterArticle.length} articles
          </Button>
        ) : null}
      </Body.Wrapper>
    </ItemsContainer>
  );
};

export default Items;
