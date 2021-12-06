import { PATH } from "constants/routes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  IBooking,
  IFilterBooking,
  IGetAllBooking,
  IRootState,
  IUrlParams,
} from "common/typings";

import BookingDisplay from "components/BookingDisplay";

import { IBookingStatusItem, statusFilterList } from "constants/filter";

import { resetAction } from "redux/actions/common";
import { setBreadCrumb } from "redux/actions/_config";
import { getAllBooking } from "redux/actions/booking";
import { getUserById } from "redux/actions/users";

import UserHeader from "./components/UserHeader";

const SIZE_PER_PAGE = 9;

const CustomerDetail: React.FC = () => {
  const { id } = useParams<IUrlParams>();
  const dispatch = useDispatch();

  const {
    allBooking: { results = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.booking);
  const { place } = useSelector((state: IRootState) => state.place);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const [filter, setFilter] = useState<IFilterBooking>({});
  const [statusSelected, setStatusSelected] = useState<IBookingStatusItem>(
    statusFilterList[statusFilterList.length - 1],
  );
  const [page, setPage] = useState<number>(1);

  const handleDateChange = (date: Date | null) => {
    setFilter({ ...filter, oneDay: date || undefined });
  };

  const handleSelectStatus = (selected: IBookingStatusItem) => {
    const status = selected.value;
    setFilter({ ...filter, status });
    setStatusSelected(selected);
  };

  useEffect(() => {
    if (place) {
      getAllBookingAPI();
    }
  }, [filter, page, place]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      getAllBookingAPI();
    }
  }, [actionSuccess]);

  const getAllBookingAPI = () => {
    const payload: IGetAllBooking = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterBooking: {
        ...filter,
        placeId: place?._id,
        createdById: id,
      },
    };
    dispatch(getAllBooking(payload));
  };

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Khách hàng",
          path: PATH.CUSTOMERS.SELF,
        },
        {
          name: "Thông tin chi tiết",
          path: PATH.CUSTOMERS.DETAIL,
        },
      ]),
    );
  };
  return (
    <div className="w-full pb-5">
      <div className="mb-3">
        <UserHeader />
      </div>
      <BookingDisplay
        results={results}
        totalCount={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        page={page}
        statusSelected={statusSelected}
        oneDay={filter?.oneDay}
        onDateChange={handleDateChange}
        onSelectStatus={handleSelectStatus}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

export default CustomerDetail;
