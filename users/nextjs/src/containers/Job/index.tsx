import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { PATH } from "@routes";

import {
  IFindJobRoute,
  IGetAllRecruitment,
  IRootState,
  ISortTypeRecruitment,
} from "@common/typings";
import { cleanObject, formatParams } from "@common/functions";
import { useRedirect } from "@common/hooks/useRedirect";

import { getAllRecruitment } from "@redux/actions/recruitment";

import Sort from "./components/Sort";
import Pagination from "@components/Pagination";
import ErrorBoundary from "@components/ErrorBoundary";
import Filter from "@components/Filter";
import Search from "@components/SearchWithProvince";
import JobCard from "@designs/Card/JobCard";
import NotFoundAlert from "@designs/NotFoundAlert";

import {
  AdsContainer,
  Content,
  ListCards,
  ListCardsContainer,
  JobContainer,
  JobWrapper,
  SearchResultContainer,
  Ads,
} from "./styles";

const SIZE_PER_PAGE = 12;

const Job: React.FC = (props) => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const fullQuery: IFindJobRoute.FullQueries = useRouter().query;
  const {
    career: _career,
    level: _level,
    salary: _salary,
    type: _type,
    province: _province,
    k: _keywords,
    page = 1,
  } = fullQuery;

  const career = formatParams(decodeURIComponent(_career || ""));
  const level = formatParams(decodeURIComponent(_level || ""));
  const salary = formatParams(decodeURIComponent(_salary || ""));
  const type = formatParams(decodeURIComponent(_type || ""));
  const province = formatParams(decodeURIComponent(_province || ""));
  const keywords = formatParams(decodeURIComponent(_keywords || ""));

  const {
    allRecruitment: { results: allJob = [], totalCount = 0, loading },
  } = useSelector((state: IRootState) => state.recruitment);
  const { sortTypeSelected } = useSelector(
    (state: IRootState) => state.recruitment,
  );

  useEffect(() => {
    getAllJobAPI();
  }, [fullQuery, sortTypeSelected]);

  const getAllJobAPI = () => {
    const payload: IGetAllRecruitment = {
      keyword: keywords,
      filterRecruitment: {
        slugCareer: career,
        slugLevel: level,
        slugLevelPrice: salary,
        slugType: type,
        slugProvince: province,
        sortType: (sortTypeSelected?.value as ISortTypeRecruitment) || "latest",
      },
      page: Number(page) - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllRecruitment(cleanObject(payload)));
  };

  const { listAdsJobPage } = useSelector((state: IRootState) => state.ads);

  const handlePageChange = (newPage: number) => {
    redirect(PATH.JOB, fullQuery, {
      ...removeParams(fullQuery),
      page: newPage + 1,
    } as IFindJobRoute.Queries);
  };

  return (
    <JobWrapper>
      <Search />
      <JobContainer>
        <Filter />
        <Content className="container">
          <SearchResultContainer>
            <Sort totalCount={totalCount} />
            <ListCardsContainer>
              {((!loading && !totalCount) || totalCount == 0) && (
                <NotFoundAlert />
              )}
              <ErrorBoundary>
                <ListCards>
                  {allJob?.map((job, index) => (
                    <JobCard job={job} key={index} />
                  ))}
                </ListCards>
              </ErrorBoundary>
            </ListCardsContainer>
            {totalCount > 0 && (
              <Pagination
                page={Number(page) - 1}
                sizePerPage={SIZE_PER_PAGE}
                totalSize={totalCount}
                onPageChange={handlePageChange}
                className="mt-2"
              />
            )}
          </SearchResultContainer>
          <AdsContainer>
            {listAdsJobPage.map((ad, index) => (
              <Ads
                className="mb-2"
                key={index}
                dangerouslySetInnerHTML={{ __html: ad[0]?.code }}
              />
            ))}
          </AdsContainer>
        </Content>
      </JobContainer>
    </JobWrapper>
  );
};

export default Job;

const removeParams = (_query: IFindJobRoute.FullQueries) => {
  const newQuery = { ..._query };
  delete newQuery.career;
  delete newQuery.level;
  delete newQuery.salary;
  delete newQuery.type;
  delete newQuery.province;
  return newQuery || {};
};
