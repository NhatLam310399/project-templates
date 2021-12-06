import React from "react";
import { useDispatch } from "react-redux";

import { IBooking } from "common/typings";
import { renderPrice } from "common/functions";

interface IDetailBookingPaymentProps {
  booking: IBooking | null;
}

const DetailBookingPayment: React.FC<IDetailBookingPaymentProps> = props => {
  const { booking } = props;
  const { status } = booking || {};

  return (
    <>
      {status === "finished" && (
        <div className="flex flex-wrap justify-between items-center gap-1 -mb-1 mt-3">
          <p className="text-lg font-semibold">Phụ thu dịch vụ</p>
          <p className="text-xl font-bold text-primary">
            {renderPrice(booking?.surcharge, "vnd")}
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center gap-1 mt-3">
        <p className="text-lg font-semibold">Tổng tiền</p>
        <p className="text-xl font-bold text-primary">
          {renderPrice(booking?.totalPayment, "vnd")}
        </p>
      </div>
    </>
  );
};

export default DetailBookingPayment;
