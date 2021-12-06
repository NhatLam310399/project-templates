import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRedirect } from "@common/hooks/useRedirect";
import {
  ICompany,
  IFindCompanyRoute,
  IFindJobRoute,
  IGetAllCompany,
  IGetCompanies,
  IGraphQLResponse,
} from "@common/typings";
import { PATH } from "@routes";
import SearchBox from "@components/SearchBox";
import { Container, Wrapper } from "./styles";
import { getAllCompany } from "@services/company";
import Link from "@designs/Link";

interface ISearchWithProvinceProps {}

const SearchWithProvince: React.FC<ISearchWithProvinceProps> = (props) => {
  const redirect = useRedirect();
  const fullQuery = useRouter().query;
  const query = removeParams(fullQuery);
  const { k = "" } = query;

  const handleSearch = (text: string, province: string) => {
    if (text && !province) {
      redirect(PATH.COMPANY_RESULT, fullQuery, {
        k: encodeURIComponent(text),
      });
    } else if (text === "" && province) {
      redirect(PATH.COMPANY_RESULT, fullQuery, {
        p: encodeURIComponent(province),
      });
    } else if (text && province) {
      redirect(PATH.COMPANY_RESULT, fullQuery, {
        k: encodeURIComponent(text),
        p: encodeURIComponent(province),
      });
    } else {
      redirect(PATH.COMPANY_RESULT, fullQuery);
    }
  };

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const history =
  //     JSON.parse(localStorage.getItem("historyCompanySearch")) || [];
  //   if (history?.length > 0) {
  //     setHistorySearch(history);
  //   }
  // }, []);

  const fetchAPiSearch = async (
    searchKeywords: string,
  ): Promise<ICompany[]> => {
    const payload: IGetCompanies = {
      keyword: searchKeywords,
    };
    const response: IGraphQLResponse = await getAllCompany(payload);
    const { getCompanies: result } = response?.data || {};
    return result?.results || [];
  };

  const renderDropdownItem = (company: ICompany) => {
    return (
      <Link
        routeName={PATH.COMPANY_DETAIL}
        params={{ slug: company?.slug }}
        className="p-1"
      >
        {company?.name}
      </Link>
    );
  };

  const handleSelect = (company: ICompany) => {
    redirect(PATH.COMPANY_DETAIL, { slug: company?.slug });
  };

  return (
    <Wrapper>
      <Container className="container">
        <SearchBox
          onFetchData={fetchAPiSearch}
          onSubmit={handleSearch}
          renderDropdownItem={renderDropdownItem}
          onSelect={handleSelect}
          value={decodeURIComponent(k)}
        />
      </Container>
    </Wrapper>
  );
};

export default SearchWithProvince;

const removeParams = (_query: IFindCompanyRoute.FullQueries) => {
  const newQuery = { ..._query };
  return newQuery || {};
};
