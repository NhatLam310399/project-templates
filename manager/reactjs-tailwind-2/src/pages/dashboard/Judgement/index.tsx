import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Rating } from "@material-ui/lab";

import {
  IGetAllRating,
  IGraphQLResponse,
  IRating,
  IRootState,
} from "common/typings";

import EmptyData from "components/EmptyData";

import { PATH } from "constants/routes";

import { setBreadCrumb } from "redux/actions/_config";
import CustomerCard from "designs/cards/CustomerCard";

import { getAllRating } from "services/rating";

const SIZE_PER_PAGE = 24;

const Judgement: React.FC = () => {
  const dispatch = useDispatch();

  const { place } = useSelector((state: IRootState) => state.place);

  const [ratingList, setRatingList] = useState<IRating[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setupBreadCrumb();

    return () => {
      setRatingList([]);
    };
  }, []);

  useEffect(() => {
    if (place) {
      getAllRatingAPI(page);
    }
  }, [page, place]);

  const getAllRatingAPI = (pageNumber = 0) => {
    const fetchApi = async () => {
      const payload: IGetAllRating = {
        filterRating: {
          place: place?._id || "",
        },
        page: pageNumber,
        size: SIZE_PER_PAGE,
      };
      setIsLoading(true);
      const response: IGraphQLResponse = await getAllRating(payload);
      setIsLoading(false);
      const { getAllRating: result = null } = response?.data || {};
      if (result) {
        const { results, totalCount: totalCountResults } = result;
        setRatingList(state => [...state, ...results]);
        if (totalCount !== totalCountResults) setTotalCount(totalCountResults);
      }
    };
    fetchApi();
  };

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.OVERVIEW,
        },
        {
          name: "Khách hàng đánh giá",
        },
      ]),
    );
  };

  const handleFetchMoreData = () => {
    setPage(state => state + 1);
  };

  return (
    <div className="w-full h-full" ref={containerRef as any}>
      {!isLoading && totalCount < 1 && <EmptyData />}
      <InfiniteScroll
        dataLength={ratingList.length}
        next={handleFetchMoreData}
        hasMore={ratingList.length < totalCount}
        loader={<SkeletonCards />}
        scrollableTarget="scrollableMain"
        className="grid w-full grid-cols-1 gap-2 Customers desktop:pb-9 phone:grid-cols-2 desktop:grid-cols-3"
      >
        {ratingList?.map(rating => {
          return (
            <div
            // to={PATH.CUSTOMERS.DETAIL.replace(":id", rating?.user?._id || "")}
            >
              <CustomerCard key={rating?._id} user={rating?.user}>
                <div className="space-y-1">
                  {rating?.content && (
                    <p className="text-md desktop:text-lg">{rating?.content}</p>
                  )}
                  <hr className="block w-full border-t border-solid border-line" />
                  <Rating
                    name="read-only"
                    value={rating?.rate}
                    readOnly
                    size="small"
                    className="justify-center"
                    style={{ display: "flex" }}
                  />
                </div>
              </CustomerCard>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Judgement;

const SkeletonCards: React.FC = props => {
  return (
    <div className="grid w-full grid-cols-1 col-span-3 gap-2 h-60 desktop:pb-9 phone:grid-cols-2 desktop:grid-cols-3 scrollbar-hide">
      {new Array(9).fill({}).map((customer, index) => {
        return <CustomerCard key={String(index)} user={customer} loading />;
      })}
    </div>
  );
};
