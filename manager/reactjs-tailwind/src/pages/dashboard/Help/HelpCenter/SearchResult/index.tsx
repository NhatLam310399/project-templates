import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { BodyWrapper, SearchResultContainer, Title, Item } from "./styles";
import Empty from "./Empty";
import { IArticle, IRootState } from "typings";
import { PATH } from "common/constants/routes";
import { addLink } from "redux/actions/help";

interface ISearchResultProps {
  titleSearchText: string;
  setIsSearch: (value: boolean) => void;
}

const SearchResult: React.FC<ISearchResultProps> = ({
  titleSearchText,
  setIsSearch,
}) => {
  const history = useHistory();
  const dispacth = useDispatch();
  const listSearchArticle = useSelector(
    (state: IRootState) => state.help.listArticle,
  );
  const listHelpCenterLevel1 = useSelector(
    (state: IRootState) => state.help.listHelpCenterLevel1,
  );
  const onHandleClickArtical = (value: IArticle) => {
    dispacth(
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
    history.push(PATH.HELP_CENTER_ARTICAL.replace(":id", `${value._id}`));
  };
  return listSearchArticle.length === 0 ? (
    <Empty titleSearchText={titleSearchText} setIsSearch={setIsSearch} />
  ) : (
    <SearchResultContainer>
      <Title>
        {listSearchArticle.length} results for "{titleSearchText}" in All
        Categories
      </Title>
      <BodyWrapper>
        {listSearchArticle.map((value, index) => {
          return (
            <Item.Wrapper key={index}>
              <Item.Title onClick={e => onHandleClickArtical(value)}>
                {value.title}
              </Item.Title>
              <Item.Desc>
                {value.content.split(".")[0]
                  ? value.content.split(".")[0] + "."
                  : value.content}
              </Item.Desc>
            </Item.Wrapper>
          );
        })}
      </BodyWrapper>
    </SearchResultContainer>
  );
};

export default SearchResult;
