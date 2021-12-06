import React from "react";
import { useDispatch } from "react-redux";

import { IBooking, IBookingStatus, IUpdateBooking } from "common/typings";
import { renderPrice } from "common/functions";
import Button from "designs/Button";
import { updateBooking } from "redux/actions/booking";

interface IWaitingActionProps {
  booking: IBooking | null;
}

const WaitingAction: React.FC<IWaitingActionProps> = props => {
  const { booking } = props;
  const dispatch = useDispatch();

  const updateBookingApi = (status: IBookingStatus) => {
    const payload: IUpdateBooking = {
      updateBookingInput: {
        status,
      },
      id: booking!._id!,
    };
    dispatch(updateBooking(payload));
  };

  const handleCanceled = () => {
    updateBookingApi("canceled");
  };

  const handleBooked = () => {
    updateBookingApi("booked");
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-1 mb-4">
        <p className="text-lg font-medium">Tổng tiền</p>
        <p className="text-xl font-bold text-primary">
          {renderPrice(booking?.totalPayment, "vnd")}
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly items-center gap-1">
        <Button
          error
          className="flex-none w-17 max-w-full"
          innerClassName="h-4.5 text-lg"
          onClick={handleCanceled}
        >
          <span className="normal-case">Hủy đơn</span>
        </Button>
        <Button
          primary
          className="flex-none w-17 max-w-full"
          innerClassName="h-4.5 text-lg"
          onClick={handleBooked}
        >
          <span className="normal-case">Duyệt lịch</span>
        </Button>
      </div>
    </>
  );
};

export default WaitingAction;
