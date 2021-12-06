import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { useRedirect } from "@common/hooks/useRedirect";
import { IFindJobRoute } from "@common/typings";
import { PATH } from "@routes/index";
import {
  BannerContainer,
  Background,
  SearchWrapper,
  SearchContainer,
  Title,
} from "./styles";
import SearchBox from "@components/SearchBoxV2";

const Banner: React.FC = () => {
  const { t } = useTranslation(["home"]);
  const [historySearch, setHistorySearch] = useState<string[]>([]);
  const redirect = useRedirect();
  const fullQuery = useRouter().query;
  const query = removeParams(fullQuery);
  const handleSubmitSearch = (text: string) => {
    //add local storage
    if (text === "") return;
    const newList = JSON.parse(localStorage.getItem("historySearch")) || [];
    newList.push(text);
    localStorage.setItem("historySearch", JSON.stringify(newList));

    setHistorySearch(newList);
    redirect(PATH.JOB, fullQuery, { ...query, k: encodeURIComponent(text) });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const history = JSON.parse(localStorage.getItem("historySearch")) || [];
    if (history?.length > 0) {
      setHistorySearch(history);
    }
  }, []);
  return (
    <BannerContainer>
      <Background
        alt="Home page background"
        width="100%"
        height="350px"
        smallSrc="/img/home/small-background.jpg"
        largeSrc="/img/home/background.jpg"
      />
      <SearchWrapper>
        <SearchContainer className="container">
          <Title>{t("banner-title")}</Title>
          <SearchBox
            listSearchCurrent={historySearch}
            onSubmit={handleSubmitSearch}
            onSelect={(value) => console.log(value)}
          />
        </SearchContainer>
      </SearchWrapper>
    </BannerContainer>
  );
};

export default Banner;

const removeParams = (_query: IFindJobRoute.FullQueries) => {
  const newQuery = { ..._query };
  delete newQuery.province;
  delete newQuery.career;
  delete newQuery.salary;
  delete newQuery.level;
  delete newQuery.type;
  return newQuery || {};
};
