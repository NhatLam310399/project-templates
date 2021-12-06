import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRedirect } from "@common/hooks/useRedirect";
import { IFindJobRoute } from "@common/typings";
import { PATH } from "@routes";
import SearchBox from "@components/SearchBoxV2";
import { Container, Wrapper } from "./styles";

interface ISearchWithProvinceProps {}

const SearchWithProvince: React.FC<ISearchWithProvinceProps> = (props) => {
  const [historySearch, setHistorySearch] = useState<string[]>([]);
  const redirect = useRedirect();
  const fullQuery = useRouter().query;
  const query = removeParams(fullQuery);
  const { k = "" } = query;
  const handleSubmitSearch = (text: string, province: string) => {
    //add local storage

    if (text) {
      const newList = JSON.parse(localStorage.getItem("historySearch")) || [];

      const isExit = newList
        ?.map((text: string) => text.toLowerCase())
        ?.includes(text.toLowerCase());
      if (!isExit) {
        newList.push(text);
        localStorage.setItem("historySearch", JSON.stringify(newList));
        setHistorySearch(newList);
      }
    }

    if (text !== "" && !province) {
      redirect(PATH.JOB, fullQuery, {
        k: encodeURIComponent(text),
      });
    } else if (text === "" && province) {
      redirect(PATH.JOB, fullQuery, {
        province: encodeURIComponent(province),
      });
    } else if (text !== "" && province) {
      redirect(PATH.JOB, fullQuery, {
        k: encodeURIComponent(text),
        province: encodeURIComponent(province),
      });
    } else {
      redirect(PATH.JOB);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const history = JSON.parse(localStorage.getItem("historySearch")) || [];
    if (history?.length > 0) {
      setHistorySearch(history);
    }
  }, []);

  return (
    <Wrapper>
      <Container className="container">
        <SearchBox
          listSearchCurrent={historySearch}
          onSubmit={handleSubmitSearch}
          hasProvince
          value={decodeURIComponent(k)}
        />
      </Container>
    </Wrapper>
  );
};

export default SearchWithProvince;

const removeParams = (_query: IFindJobRoute.FullQueries) => {
  const newQuery = { ..._query };
  delete newQuery.province;
  delete newQuery.career;
  delete newQuery.salary;
  delete newQuery.level;
  delete newQuery.type;
  return newQuery || {};
};
