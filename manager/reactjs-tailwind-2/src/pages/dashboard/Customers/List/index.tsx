import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  IGetAllCustomerByKaraoke,
  IGraphQLResponse,
  IHistoryCustomerBooking,
  IRootState,
} from "common/typings";

import EmptyData from "components/EmptyData";

import { PATH } from "constants/routes";

import CustomerCard from "designs/cards/CustomerCard";
import CustomerCardBooking from "designs/cards/CustomerCard/CustomerCardBooking";
import SkeletonCards from "designs/cards/CustomerCard/SkeletonCards";

import { setBreadCrumb } from "redux/actions/_config";

import { getAllCustomerByKaraoke } from "services/customer";

const SIZE_PER_PAGE = 24;

const Customers: React.FC = () => {
  const dispatch = useDispatch();

  const { place } = useSelector((state: IRootState) => state.place);

  const [resultsApi, setResultsApi] = useState<IHistoryCustomerBooking[]>([]);
  const [historyCustomerBooking, setHistoryCustomerBooking] = useState<
    IHistoryCustomerBooking[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  useEffect(() => {
    if (place) {
      getAllCustomerAPI(page);
    }
  }, [page, place]);

  useEffect(() => {
    setIsLoading(false);
    setHistoryCustomerBooking([...historyCustomerBooking, ...resultsApi]);
  }, [resultsApi]);

  const getAllCustomerAPI = (pageNumber = 0) => {
    const fetchApi = async () => {
      const payload: IGetAllCustomerByKaraoke = {
        idKara: place?._id || "",
        page: pageNumber,
        size: SIZE_PER_PAGE,
      };
      setIsLoading(true);
      const response: IGraphQLResponse = await getAllCustomerByKaraoke(payload);
      setIsLoading(false);
      const { getAllCustomerByKaraoke: result = null } = response?.data || {};
      if (result) {
        const { results, totalCount: totalCountResults } = result;
        setResultsApi(results);
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
          name: "Khách hàng",
          path: PATH.CUSTOMERS.SELF,
        },
      ]),
    );
  };

  const handleFetchMoreData = () => {
    setPage(state => state + 1);
  };

  return (
    <div className="w-full h-full" ref={containerRef as any}>
      {!isLoading && !totalCount && <EmptyData />}
      <InfiniteScroll
        dataLength={historyCustomerBooking.length}
        next={handleFetchMoreData}
        hasMore={historyCustomerBooking.length < totalCount}
        scrollableTarget="scrollableMain"
        loader={<SkeletonCards />}
        className="grid w-full grid-cols-1 gap-2 Customers desktop:pb-9 phone:grid-cols-2 desktop:grid-cols-3 scrollbar-hide"
      >
        {historyCustomerBooking.map((historyBooking, index) => {
          return (
            <Link
              to={PATH.CUSTOMERS.DETAIL.replace(
                ":id",
                historyBooking?.user?._id || "",
              )}
            >
              <CustomerCard key={String(index)} user={historyBooking?.user}>
                <div className="pt-1">
                  <CustomerCardBooking historyBooking={historyBooking} />
                </div>
              </CustomerCard>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Customers;
