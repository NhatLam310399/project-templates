import { IHistoryCustomerBooking } from "common/typings";
import dayjs from "dayjs";
import React from "react";

interface ICustomerCardBookingProps {
  historyBooking: IHistoryCustomerBooking;
}

const CustomerCardBooking: React.FC<ICustomerCardBookingProps> = props => {
  const { historyBooking: { amount, bookingStartDate } = {} } = props;
  return (
    <div className="grid grid-cols-2 font-medium text-primary">
      <div className="text-center border-r text-md laptop:text-lg border-grey border-opacity-60">
        <p className="mb-1 text-lg laptop:text-xl ">{amount}</p>
        <p className="text-black">Đặt phòng</p>
      </div>
      <div className="text-center text-md laptop:text-lg">
        <p className="mb-1 text-lg laptop:text-xl ">
          {dayjs(bookingStartDate).format("DD/MM/YYYY")}
        </p>
        <p className="text-black">Ngày bắt đầu đặt</p>
      </div>
    </div>
  );
};

export default CustomerCardBooking;
