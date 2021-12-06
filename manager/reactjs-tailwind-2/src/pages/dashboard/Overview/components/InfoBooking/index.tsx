import React from "react";
import Avatar, { SkeletonAvatar } from "designs/Avatar";
import { GlobalIcon } from "designs/icons/GlobalIcon";
import { IBooking } from "common/typings";
import dayjs from "dayjs";
import TagBookingStatus from "designs/TagBookingStatus";

interface IInfoBooking {
  booking: IBooking;
}
const InfoBooking: React.FC<IInfoBooking> = props => {
  const { booking } = props;
  const { urlAvt, displayName, email, phoneNumber } = booking?.createdBy || {};
  return (
    <div className="info-booking w-full flex justify-between items-center flex-wrap gap-1 p-1 mb-2">
      <div className="flex-none w-5 phone:w-8">
        <img
          src={urlAvt?.small || urlAvt?.default || SkeletonAvatar}
          className="w-5 h-5 rounded-full block object-cover"
          alt="avatar"
        />
      </div>
      <div className="flex-1 text-sm space-y-0">
        <p className="text-primary font-medium">{displayName}</p>
        <p className="text-body">{email}</p>
        <p className="text-body">{phoneNumber}</p>
      </div>
      <div className="flex-none phone:w-25 text-sm space-y-0.5">
        <p className="flex items-center gap-1">
          <GlobalIcon.CalendarCurrentIcon />
          <span className="">
            {dayjs(booking?.createdAt).format("DD/MM/YYYY")}
          </span>
        </p>
        <p className="flex items-center gap-1">
          <GlobalIcon.TimeIcon />
          <span className="lowercase">
            {dayjs(booking?.createdAt).format("H:m a")}
          </span>
        </p>
      </div>
      <div className="flex-none w-full phone:w-10 overflow-hidden">
        {booking?.status && (
          <TagBookingStatus className="float-right" type={booking?.status} />
        )}
      </div>
    </div>
  );
};
export default InfoBooking;
