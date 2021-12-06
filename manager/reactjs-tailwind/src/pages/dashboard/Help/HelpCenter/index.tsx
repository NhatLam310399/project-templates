import { useState, useEffect } from "react";
import SearchBox from "components/SearchBoxHelp";
import { Title } from "designs/Title";
import { Wrapper } from "designs/Wrapper";
import { Caption, HeaderContainer, HelpCenterContainer } from "./styles";
import Button from "designs/Button";

import ListHelpCenterType from "./ListHelpCenterType";
import SearchResult from "./SearchResult";
import { useDispatch } from "react-redux";
import { searchAllArticle } from "redux/actions/help";
import { IGetArticle } from "typings";

const HelpCenter: React.FC = () => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");
  const [titleSearchText, setTitleSeachText] = useState<string>("");
  const onClickSearch = () => {
    if (textSearch.trim().length > 0) {
      setTitleSeachText(textSearch);
      setIsSearch(true);
      dispatch(
        searchAllArticle<IGetArticle>({
          page: 0,
          filterArtical: {
            title: textSearch,
          },
        }),
      );
    }
  };
  return (
    <Wrapper isBackgroundNeutral>
      <HelpCenterContainer>
        <HeaderContainer>
          <Title>Kingify Help Center</Title>
          <Caption>Find answer to all of your questions</Caption>
          <SearchBox setText={setTextSearch} />
          <div
            className="flex items-center justify-center mt-1"
            onClick={onClickSearch}
          >
            <Button>Search</Button>
          </div>
        </HeaderContainer>
      </HelpCenterContainer>
      {isSearch ? (
        <SearchResult
          titleSearchText={titleSearchText}
          setIsSearch={setIsSearch}
        />
      ) : (
        <ListHelpCenterType />
      )}
    </Wrapper>
  );
};

export default HelpCenter;
