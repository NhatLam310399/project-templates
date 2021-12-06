import React from "react";
import dayjs from "dayjs";

import SVG from "designs/SVG";
import { IBooking } from "common/typings";
import DetailBookingInfo from "./DetailInfo";

interface IBookingDetailProps {
  booking: IBooking | null;
  onClose?: () => void;
  loading?: boolean;
  className?: string;
}

const BookingDetail: React.FC<IBookingDetailProps> = props => {
  const { booking, onClose, children, className = "" } = props;

  const handleCloseModal = () => {
    onClose && onClose();
  };

  return (
    <div className="fixed desktop:static inset-0 z-40 w-full h-full flex justify-center items-center desktop:block p-2 desktop:p-0">
      <div
        className="absolute top-0 left-0 block w-full h-full bg-black desktop:hidden opacity-40"
        onClick={handleCloseModal}
      />
      <div
        className={`relative w-full max-h-full max-w-2xl rounded bg-tertiary 
        overflow-y-auto leading-none p-2 phone:px-4 ${className}`}
      >
        <button
          type="button"
          className="absolute block desktop:hidden right-1.5 top-1.5"
          onClick={handleCloseModal}
        >
          <SVG
            name="booking/close"
            width="25"
            height="25"
            className="block m-auto object-contain"
          />
        </button>
        <DetailBookingInfo booking={booking} />
        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
};

export default BookingDetail;
