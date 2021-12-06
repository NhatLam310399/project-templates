import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IBooking,
  IFilterBooking,
  IGetAllBooking,
  IRootState,
} from "common/typings";
import { PATH } from "constants/routes";
import { IBookingStatusItem, statusFilterList } from "constants/filter";

import { setBreadCrumb } from "redux/actions/_config";
import { getAllBooking, setTypeDialogActive } from "redux/actions/booking";

import { resetAction } from "redux/actions/common";

import BookingDisplay from "components/BookingDisplay";

const SIZE_PER_PAGE = 9;

const Booking: React.FC = () => {
  const dispatch = useDispatch();

  const {
    allBooking: { results = [], totalCount = 0 },
    typeDialogActive,
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
      // setBookingChoose(null);
    }
  }, [filter, page, place]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      getAllBookingAPI();
      switch (typeDialogActive) {
        case "CLOSE":
          getAllBookingAPI();
          break;
        case "PAYMENT":
          dispatch(setTypeDialogActive("PAYMENT_SUCCESS"));
          break;
        default:
          break;
      }
    }
  }, [actionSuccess]);

  const getAllBookingAPI = () => {
    const payload: IGetAllBooking = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterBooking: {
        ...filter,
        placeId: place?._id,
      },
    };
    dispatch(getAllBooking(payload));
  };

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.OVERVIEW,
        },
        {
          name: "Lịch đặt phòng",
          path: PATH.BOOKING,
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  return (
    <div className="w-full booking ">
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

export default Booking;
