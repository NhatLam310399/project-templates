import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

import DetailBookingPayment from "components/BookingDetail/DetailPayment";

import { IBooking, IRootState } from "common/typings";
import { IBookingStatusItem, statusFilterList } from "constants/filter";

import DatePicker from "designs/DatePicker";
import Select from "designs/Select";
import BookingCalendarCard from "designs/cards/BookingCalendarCard";

import BookingDetail from "components/BookingDetail";
import EmptyData from "components/EmptyData";

import BookedAction from "pages/dashboard/BookingCalendar/components/BookedAction";
import WaitingAction from "pages/dashboard/BookingCalendar/components/WaitingAction";

interface IBookingDisplay {
  results: IBooking[];
  totalCount: number;
  sizePerPage: number;
  page: number;
  statusSelected: IBookingStatusItem;
  oneDay?: Date;
  onDateChange: (date: Date | null) => void;
  onSelectStatus: (selected: IBookingStatusItem) => void;
  onChangePage: (nextPage: number) => void;
}

const BookingDisplay: React.FC<IBookingDisplay> = props => {
  const {
    results,
    totalCount,
    sizePerPage,
    page,
    statusSelected,
    oneDay,
    onDateChange,
    onSelectStatus,
    onChangePage,
  } = props;
  const dispatch = useDispatch();

  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const { typeDialogActive = "CLOSE" } = useSelector(
    (state: IRootState) => state.booking,
  );
  const [bookingChoose, setBookingChoose] = useState<IBooking | null>(null);

  useEffect(() => {
    if (actionSuccess) {
      if (bookingChoose?.status !== "booked") {
        setBookingChoose(null);
      }
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (typeDialogActive === "CLOSE") {
      setBookingChoose(null);
    }
  }, [typeDialogActive]);

  const handleChoose = (bookingCalendar: IBooking) => {
    setBookingChoose(bookingCalendar);
  };

  const handleClose = () => {
    setBookingChoose(null);
  };

  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
    setBookingChoose(null);
  };

  const handleSelectStatus = (selected: IBookingStatusItem) => {
    onSelectStatus(selected);
    setBookingChoose(null);
  };

  const handleChangePage = (
    e: React.ChangeEvent<unknown>,
    nextPage: number,
  ) => {
    onChangePage(nextPage);
    setBookingChoose(null);
  };

  const totalPage = Math.ceil(totalCount / sizePerPage);

  return (
    <>
      <div className="grid w-full grid-cols-1 phone:grid-cols-2 gap-y-2 desktop:grid-cols-4 gap-x-2 phone:gap-y-3">
        <Select
          onSelectOption={handleSelectStatus}
          options={statusFilterList}
          value={statusSelected?.name}
          className="col-span-1"
        />
        <DatePicker
          date={oneDay}
          onChange={handleDateChange}
          className="col-span-1 phone:mt-0.5"
          placeholder="dd/mm/yyyy"
        />
      </div>
      {!isLoading && results?.length < 1 ? (
        <EmptyData />
      ) : (
        <div className="relative grid grid-cols-2 col-span-1 gap-2 mt-3 ">
          <div className="grid grid-cols-1 col-span-2 gap-2 phone:col-span-2 desktop:col-span-1 desktop:flex desktop:justify-start desktop:flex-col">
            <div className="grid grid-cols-1 gap-y-2 phone:col-span-1 phone:grid-cols-3 phone:gap-2 desktop:flex desktop:flex-col">
              {results?.map(booking => (
                <BookingCalendarCard
                  onClick={handleChoose}
                  key={String(booking?._id)}
                  bookingCalendar={booking}
                  active={booking?._id === bookingChoose?._id}
                />
              ))}
            </div>
            {totalPage > 1 && (
              <div className="flex justify-start col-span-1 py-1 pagination-wrap">
                <Pagination
                  page={page}
                  count={totalPage}
                  onChange={handleChangePage}
                />
              </div>
            )}
          </div>

          <div className="">
            {bookingChoose && (
              <BookingDetail onClose={handleClose} booking={bookingChoose}>
                {renderAction(bookingChoose)}
              </BookingDetail>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDisplay;

const renderAction = (booking: IBooking) => {
  const { status } = booking;
  switch (status) {
    case "booked":
      return <BookedAction booking={booking} />;
    case "waiting_for_approved":
      return <WaitingAction booking={booking} />;
    case "finished":
    case "canceled":
    case "except_canceled":
      return <DetailBookingPayment booking={booking} />;
    default:
      return null;
  }
};
